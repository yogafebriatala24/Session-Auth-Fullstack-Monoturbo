import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware running for:", req.nextUrl.pathname);
  const sessionCookie = req.cookies.get("connect.sid");
  console.log("Session cookie in middleware:", sessionCookie);

  if (!sessionCookie) {
    console.log("No session cookie found, redirecting to /login");
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  console.log("Session cookie found, proceeding.");
  return NextResponse.next();
}

export const config = {
  matcher: "/about",
};
