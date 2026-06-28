import { NextResponse } from "next/server";
import { supabaseLogin } from "@/lib/supabaseREST";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const session = await supabaseLogin(email, password);
    return NextResponse.json(session);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Login API error:", err);
    return NextResponse.json(
      { error: err.message || "Authentication failed" },
      { status: 401 }
    );
  }
}
