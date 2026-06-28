import { NextResponse } from "next/server";
import { supabaseInsertBooking, supabaseGetBookings } from "@/lib/supabaseREST";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phoneNumber, sessionType, cost } = body;

    const booking = await supabaseInsertBooking({
      name,
      phoneNumber,
      sessionType,
      cost,
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Booking submission error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await supabaseGetBookings();
    return NextResponse.json(bookings);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Booking fetch error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
