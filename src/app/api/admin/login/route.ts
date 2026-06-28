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
    const response = NextResponse.json(session);

    // Set a secure HttpOnly cookie for the session
    response.cookies.set("admin_session", session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Login API error:", err);
    return NextResponse.json(
      { error: err.message || "Authentication failed" },
      { status: 401 }
    );
  }
}
