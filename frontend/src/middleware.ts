import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/utils/user";
import {getLocale} from "next-intl/server";

const intlMiddleware = createMiddleware(routing);

//export default createMiddleware(routing);

export async function middleware(req: NextRequest) {
    const intlResponse = intlMiddleware(req);
    const response = intlResponse || NextResponse.next();
    const locale = await getLocale();

    const clientPath = req.nextUrl.pathname;

    // admin panel pages jwt checking middleware
    if (clientPath.substring(3).startsWith("/admin")
        && !clientPath.substring(3).startsWith("/admin/sign") ) {
        const user = await getUser();
        if (!user) {
            return NextResponse.redirect(new URL(`/${locale}/admin/sign-in`, req.url));
        }
    }
    const headers = new Headers(req.headers);
    headers.set("x-is-home", "false");

    if(req.nextUrl.pathname.substring(3).length == 0) {
        // https://medium.com/@beecodeguy/access-current-pathname-in-server-components-next-js-app-router-81686d2ed60f

        response.headers.set("x-is-home", "true");
        console.log("-----middlewre--->"+headers.get("x-is-home"));
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
