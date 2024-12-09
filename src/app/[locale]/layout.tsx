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
    const pageT = await getTranslations({ locale, namespace: 'IndexPage' });

    return {
        title: pageT('title'),
        description: pageT('description'),
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