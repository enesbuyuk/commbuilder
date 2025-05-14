import { notFound } from 'next/navigation';
import {getMessages, setRequestLocale} from 'next-intl/server';
import { routing } from '@/i18n/routing';
import React from "react";
import {NextIntlClientProvider} from "next-intl";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const dynamic = 'force-dynamic'

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale:string}> }) {
    const {locale} = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body className="text-gray-900 bg-gray-100 font-roboto antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
            <Header locale={locale}/>
            {children}
            <Footer/>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
