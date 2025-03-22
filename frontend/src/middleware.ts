import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/utils/user";
import {getLocale} from "next-intl/server";

const intlMiddleware = createMiddleware(routing);

//export default createMiddleware(routing);

export async function middleware(req: NextRequest) {
    //console.log("ex url:", req.nextUrl.pathname);

    const intlResponse = intlMiddleware(req);
    const response = intlResponse || NextResponse.next();
    const locale = await getLocale();

    //console.log("new url:", req.nextUrl.pathname);

    const clientPath = req.nextUrl.pathname;

    // admin panel pages jwt checking middleware
    if (clientPath.substring(3).startsWith("/admin")
        && !clientPath.substring(3).startsWith("/admin/sign") ) {
        const user = await getUser();
        if (!user) {
            return NextResponse.redirect(new URL(`/${locale}/admin/sign-in`, req.url));
        }
    }
    return response;
}

export const config = {
    matcher: [
        "/",
        "/(tr|en)/:path*",
        '/((?!_next|api|opengraph-image|_vercel|.*\\..*).*)', // API, static fiels routes are excluded
        "/(tr|en)/admin/:path*", // admin pages
    ],
};
