import { NextResponse } from "next/server";
import { supabaseProcessBooking } from "@/lib/supabaseREST";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingId, adminId, grantLifetime } = body;

    if (!bookingId || !adminId) {
      return NextResponse.json(
        { error: "Booking ID and Admin ID are required" },
        { status: 400 }
      );
    }

    const updatedBooking = await supabaseProcessBooking(bookingId, adminId, !!grantLifetime);
    return NextResponse.json({
      success: true,
      message: "Booking processed successfully and membership activated.",
      booking: updatedBooking,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error processing booking:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process booking" },
      { status: 500 }
    );
  }
}
