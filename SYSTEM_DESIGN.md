# Gym System Design & Data Flow

## Database Schema (Prisma / SQLite)

### 1. Bookings Table
Stores initial inquiries made via the Landing Page form.
*   `id` (Primary Key, UUID/Int)
*   `name` (String): User's full name.
*   `phoneNumber` (String): User's contact number.
*   `sessionType` (Enum/String): "DAILY", "WEEKLY", or "MONTHLY".
*   `cost` (Float): The calculated cost at the time of booking.
*   `status` (String): Defaults to "PENDING". Can be updated to "COMPLETED" or "CANCELLED".
*   `createdAt` (DateTime): Timestamp of the submission.

### 2. Memberships Table
Stores official members who have paid in person (face-to-face).
*   `id` (Primary Key, UUID/Int)
*   `bookingId` (Foreign Key, Optional): Links back to original booking.
*   `name` (String): Member's full name.
*   `phoneNumber` (String): Member's contact number.
*   `membershipType` (String): Inherited from sessionType ("DAILY", "WEEKLY", "MONTHLY").
*   `activeUntil` (DateTime): Calculated based on the membership type and payment date.
*   `createdAt` (DateTime): Timestamp of when they became a confirmed member.

## System Data Flow

1.  **User Inquiry:**
    *   User navigates to `/discover`.
    *   User selects a session type (cost calculates dynamically).
    *   User submits the form.
    *   Frontend sends a `POST` request to `/api/bookings`.
2.  **Database Write:**
    *   The API validates the request (checks for name, number).
    *   Prisma creates a new record in the `Bookings` table.
3.  **Admin Review:**
    *   Admin accesses `/admin` (localhost).
    *   Frontend requests `/api/admin/bookings`.
    *   Admin sees the new booking in the table.
4.  **Conversion to Member (Face-to-Face Payment):**
    *   The user arrives at the gym and pays.
    *   Admin clicks "Confirm Payment" next to the user's booking in the admin panel.
    *   Frontend sends a `POST` request to `/api/admin/members` with the booking details.
    *   The API creates a record in the `Memberships` table and updates the `Bookings` record status to "COMPLETED".