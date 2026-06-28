import { NextResponse } from "next/server";
import { supabaseGetActiveMemberships } from "@/lib/supabaseREST";

export async function GET() {
  try {
    const memberships = await supabaseGetActiveMemberships();
    return NextResponse.json(memberships);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error fetching active memberships:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch active memberships" },
      { status: 500 }
    );
  }
}
