import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const pathname = request.nextUrl.pathname;

  if (session && pathname === "/auth") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(
      new URL("/auth?signin=true", request.url)
    );
  }

  if (
    pathname.startsWith("/dashboard/admin") &&
    session?.user?.role !== "admin"
  ) {
    return NextResponse.redirect(
      new URL("/unauthorized", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/dashboard/:path*"],
};