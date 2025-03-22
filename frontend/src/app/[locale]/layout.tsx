import { notFound } from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import BaseLayout from '@/components/BaseLayout';
import { routing } from '@/i18n/routing';
import React from "react";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const translations = {
        generalTranslations: await getTranslations({ locale, namespace: 'General' }),
        pageTranslations: await getTranslations({ locale, namespace: 'IndexPage' })
    }

    return {
        title: translations.pageTranslations('title'),
        description: translations.pageTranslations('description'),
        keywords: translations.pageTranslations('keywords').split(',').map((keyword: string) => keyword.trim()),
        openGraph: {
            siteName: translations.generalTranslations('title'),
            title: translations.pageTranslations('title'),
            description: translations.pageTranslations('description'),
            type: 'website'
        },
        alternates: {
            canonical: `/${locale}`,
        }
    };
}

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale:string}> }) {
   const {locale} = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
