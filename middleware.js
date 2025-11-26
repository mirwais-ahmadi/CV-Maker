import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    const publicPaths = ["/signin", "/signup", "/public", "/api/auth", "/_next"];
    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        const protectedPaths = ["/cv", "/contact", "/user-dashboard", "/dashboard"];
        if (protectedPaths.some(path => pathname.startsWith(path))) {
            const loginUrl = new URL("/signin", req.url);
            loginUrl.searchParams.set("callbackUrl", req.url);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    const role = token.role;

    if (pathname.startsWith("/dashboard") && role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/cv/:path*",
        "/contact/:path*",
        "/user-dashboard/:path*",
    ],
};
