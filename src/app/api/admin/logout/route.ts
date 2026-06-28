import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true, message: "Logged out successfully" });
    
    // Clear the admin_session cookie
    response.cookies.set("admin_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), // Set expiration date in the past to delete the cookie
      path: "/",
    });
    
    return response;
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Logout API error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to log out" },
      { status: 500 }
    );
  }
}
