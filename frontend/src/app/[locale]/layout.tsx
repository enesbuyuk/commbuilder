import { notFound } from 'next/navigation';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import { routing } from '@/i18n/routing';
import React from "react";
import {NextIntlClientProvider} from "next-intl";
import Footer from "@/components/Footer";

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const metadataTranslations = await getTranslations({
        locale,
        namespace: "metadata.index"
    })

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
        title:{
            default: metadataTranslations("title"),
            template: "%s | " + metadataTranslations("title")
        },
        description: metadataTranslations("description"),
        keywords: metadataTranslations("keywords"),
        openGraph:{
            siteName: metadataTranslations("title"),
            title: {
                default: metadataTranslations("title"),
                template: "%s | " + metadataTranslations("title")
            },
            type: "website",
        },
        alternates:{
            canonical: process.env.NEXT_PUBLIC_SITE_URL,
            languages: {
                en: process.env.NEXT_PUBLIC_SITE_URL + "/en",
                tr: process.env.NEXT_PUBLIC_SITE_URL + "/tr",
            }
        }
    }
}

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
                    {children}
                    <Footer/>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
