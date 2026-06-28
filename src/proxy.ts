import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin GET endpoints and POST processing endpoints
  if (
    pathname === "/api/active-members" ||
    pathname === "/api/bookings/process" ||
    (pathname === "/api/bookings" && request.method === "GET")
  ) {
    const sessionToken = request.cookies.get("admin_session")?.value;

    if (sessionToken !== "native-session-token") {
      return NextResponse.json(
        { error: "Unauthorized access. Please log in first." },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/bookings",
    "/api/active-members",
    "/api/bookings/process",
  ],
};
