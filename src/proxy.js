import { headers } from "next/headers";
import { auth } from "./lib/auth";
import { NextResponse } from "next/server";

export async function proxy(request) {
    const session = auth.api.getSession({
        headers: await headers(),
    });

    const pathname = request.nextUrl.pathname;

    if (session && pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/", request.url));
    };

    if (pathname.startsWith("/dashboard") && !session) {
        return NextResponse.redirect(
            new URL("/auth?signin=true", request.url)
        );
    };

    if (pathname.startsWith("/dashboard/admin") && session?.user?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
    };

    return NextResponse.next();
};

export const config = { matcher: ["/auth", "/dashboard/:path*",], };