import { NextResponse } from 'next/server';
import { getLocale } from "next-intl/server";

export async function GET() {
    const locale = await getLocale();
    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/admin/sign-in`);

    response.cookies.set('token', '', {
        httpOnly: true,
        //secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
        path: '/',
    });

    return response;
}
