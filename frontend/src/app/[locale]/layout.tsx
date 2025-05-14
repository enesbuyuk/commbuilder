import {getTranslations} from 'next-intl/server';
import { routing } from '@/i18n/routing';
import React from "react";

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
            canonical: process.env.NEXT_PUBLIC_SITE_URL+`/${locale}`,
            languages: {
                en: process.env.NEXT_PUBLIC_SITE_URL + "/en",
                tr: process.env.NEXT_PUBLIC_SITE_URL + "/tr",
            }
        }
    }
}

export default function LocaleLayout({children}: {children: React.ReactNode}) {
    return <>{children}</>;
}
