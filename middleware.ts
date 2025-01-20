import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  const token = req.headers.get("authorization");
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*"],
};
