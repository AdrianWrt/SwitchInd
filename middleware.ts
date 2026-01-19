import { getServerSession } from "next-auth";
import { authOptions } from "@/auth-options";
import { NextRequest, NextResponse } from "next/server";

// Protect routes: checkout + admin
export async function middleware(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to these routes
export const config = {
  matcher: ["/checkout", "/admin/:path*"],
};
