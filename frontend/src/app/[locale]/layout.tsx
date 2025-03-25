import { notFound } from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import BaseLayout from '@/components/BaseLayout';
import { routing } from '@/i18n/routing';
import React from "react";
import {getMetadata} from "@/lib/metadata";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

const pageName = "index";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getMetadata(locale, pageName);
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
