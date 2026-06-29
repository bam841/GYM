// src/lib/supabaseREST.ts
// Direct PostgreSQL query module (replaces PostgREST fetch calls)

import { query, pool } from "./db";

export interface Booking {
  id: string;
  name: string;
  phoneNumber: string;
  sessionType: string;
  cost: number;
  status: string;
  createdAt: string;
}

// Insert a Booking (Normalized Flow)
export async function supabaseInsertBooking(bookingData: {
  name: string;
  phoneNumber: string;
  sessionType: string;
  cost: number;
}): Promise<Booking> {
  const cleanPhone = bookingData.phoneNumber.trim();
  const cleanName = bookingData.name.trim();

  // 1. Get or create member record
  let memberId: string;
  const memberRes = await query("SELECT id FROM members WHERE phone_number = $1", [cleanPhone]);

  if (memberRes.rows.length > 0) {
    memberId = memberRes.rows[0].id;
    // Update the member's name to the latest name entered for this phone number
    await query("UPDATE members SET name = $1 WHERE id = $2", [cleanName, memberId]);
  } else {
    const insertMemberRes = await query(
      "INSERT INTO members (name, phone_number) VALUES ($1, $2) RETURNING id",
      [cleanName, cleanPhone]
    );
    memberId = insertMemberRes.rows[0].id;
  }

  // 2. Insert the Booking referencing member_id
  const insertBookingRes = await query(
    "INSERT INTO bookings (member_id, book_type, cost, status) VALUES ($1, $2, $3, $4) RETURNING book_id, book_type, cost, status, date_booked",
    [memberId, bookingData.sessionType, bookingData.cost, "PENDING"]
  );

  const row = insertBookingRes.rows[0];

  // Return mapped booking containing name/phone
  return {
    id: row.book_id,
    name: cleanName,
    phoneNumber: cleanPhone,
    sessionType: row.book_type,
    cost: Number(row.cost),
    status: row.status,
    createdAt: row.date_booked instanceof Date ? row.date_booked.toISOString() : String(row.date_booked),
  };
}

// Fetch bookings with Member data joined via native SQL join
export async function supabaseGetBookings(authToken?: string): Promise<Booking[]> {
  const res = await query(`
    SELECT b.book_id, b.book_type, b.cost, b.status, b.date_booked, m.name, m.phone_number
    FROM bookings b
    JOIN members m ON b.member_id = m.id
    ORDER BY b.date_booked DESC
  `);

  return res.rows.map((row) => ({
    id: row.book_id,
    name: row.name,
    phoneNumber: row.phone_number,
    sessionType: row.book_type,
    cost: Number(row.cost),
    status: row.status,
    createdAt: row.date_booked instanceof Date ? row.date_booked.toISOString() : String(row.date_booked),
  }));
}

// Admin login flow querying local/production admins table directly
export async function supabaseLogin(email: string, password: string) {
  const res = await query(
    "SELECT id, email, admin_name FROM admins WHERE email = $1 AND password_hash = $2",
    [email, password]
  );

  if (res.rows.length === 0) {
    throw new Error("Invalid admin email or password.");
  }

  const admin = res.rows[0];

  return {
    access_token: "native-session-token",
    user: {
      id: admin.id,
      email: admin.email,
      user_metadata: {
        name: admin.admin_name,
      },
    },
  };
}

// Atomic transaction to process booking payment and activate/extend membership
export async function supabaseProcessBooking(bookingId: string, adminId: string, grantLifetime?: boolean): Promise<Booking> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Update booking status and get details
    const updateRes = await client.query(
      `UPDATE bookings 
       SET status = 'COMPLETED', processed_by = $1 
       WHERE book_id = $2 
       RETURNING book_id, member_id, book_type, cost, status, date_booked`,
      [adminId, bookingId]
    );

    if (updateRes.rows.length === 0) {
      throw new Error(`Booking with ID ${bookingId} not found.`);
    }

    const bookingRow = updateRes.rows[0];
    const { member_id, book_type, cost } = bookingRow;

    // 2. Fetch member details
    const memberRes = await client.query("SELECT name, phone_number FROM members WHERE id = $1", [member_id]);
    if (memberRes.rows.length === 0) {
      throw new Error(`Member with ID ${member_id} not found.`);
    }
    const member = memberRes.rows[0];

    // 3. Determine expiration extension interval
    let daysToAdd = 1;
    let finalBookType = book_type;

    if (grantLifetime) {
      await client.query(
        "UPDATE bookings SET book_type = 'LIFETIME' WHERE book_id = $1",
        [bookingId]
      );
      finalBookType = "LIFETIME";
      daysToAdd = 36500; // 100 years of permanent access
    } else if (book_type && book_type.toUpperCase().includes("WEEKLY")) {
      daysToAdd = 7;
    } else if (book_type && book_type.toUpperCase().includes("MONTHLY")) {
      daysToAdd = 30;
    }

    // Check if member already has an active membership
    const activeRes = await client.query(
      "SELECT start_date, end_date FROM active_memberships WHERE member_id = $1",
      [member_id]
    );

    let previousEndDate: Date | null = null;
    let startDate = new Date();
    let endDate = new Date();

    if (activeRes.rows.length > 0) {
      const currentEndDate = new Date(activeRes.rows[0].end_date);
      // If the current membership is still active, extend it. Otherwise, start from now.
      if (currentEndDate > new Date()) {
        previousEndDate = currentEndDate;
        startDate = currentEndDate;
      }
    }

    endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + daysToAdd);

    // 4. Upsert active_memberships
    const activeStartDate = activeRes.rows.length > 0 && previousEndDate 
      ? new Date(activeRes.rows[0].start_date) 
      : new Date();

    await client.query(
      `INSERT INTO active_memberships (member_id, membership_type, start_date, end_date)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (member_id) 
       DO UPDATE SET 
         membership_type = EXCLUDED.membership_type,
         start_date = EXCLUDED.start_date,
         end_date = EXCLUDED.end_date`,
      [member_id, finalBookType, activeStartDate, endDate]
    );

    // 5. Log in renewals history
    await client.query(
      `INSERT INTO renewals (member_id, amount_paid, previous_end_date, new_end_date)
       VALUES ($1, $2, $3, $4)`,
      [member_id, cost, previousEndDate, endDate]
    );

    await client.query("COMMIT");

    return {
      id: bookingRow.book_id,
      name: member.name,
      phoneNumber: member.phone_number,
      sessionType: finalBookType,
      cost: Number(bookingRow.cost),
      status: bookingRow.status,
      createdAt: bookingRow.date_booked instanceof Date ? bookingRow.date_booked.toISOString() : String(bookingRow.date_booked),
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

// Fetch all active memberships with joined member details
export interface ActiveMembership {
  id: string;
  name: string;
  phoneNumber: string;
  membershipType: string;
  startDate: string;
  endDate: string;
}

export async function supabaseGetActiveMemberships(): Promise<ActiveMembership[]> {
  const res = await query(`
    SELECT am.id, am.membership_type, am.start_date, am.end_date, m.name, m.phone_number
    FROM active_memberships am
    JOIN members m ON am.member_id = m.id
    ORDER BY am.end_date DESC
  `);

  return res.rows.map((row) => ({
    id: row.id,
    name: row.name,
    phoneNumber: row.phone_number,
    membershipType: row.membership_type,
    startDate: row.start_date instanceof Date ? row.start_date.toISOString() : String(row.start_date),
    endDate: row.end_date instanceof Date ? row.end_date.toISOString() : String(row.end_date),
  }));
}


