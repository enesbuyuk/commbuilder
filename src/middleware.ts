import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// next-intl middleware
const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
    // firstly check internationalization middleware
    const intlResponse = intlMiddleware(req);
    if (intlResponse) return intlResponse;

    // admin panel pages jwt checking middleware
    if (req.nextUrl.pathname.startsWith("/admin")) {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.redirect(new URL("/admin/sign-in", req.url));
        }

        try {
            const secret = process.env.JWT_SECRET!;
            jwt.verify(token, secret);
        } catch (error) {
            return NextResponse.redirect(new URL("/admin/sign-in", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/(tr|en)/:path*",
        '/((?!_next|api|opengraph-image|_vercel|.*\\..*).*)', // API, static fiels routes are excluded
        "/admin/:path*", // admin pages
    ],
};
