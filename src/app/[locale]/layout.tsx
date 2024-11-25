import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React, { ReactNode } from 'react';
import BaseLayout from '@/components/BaseLayout';
import { routing } from '@/i18n/routing';

type Props = {
    children: ReactNode;
    params: { locale: string };
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props ) {
    const { locale } = await Promise.resolve(params);
    const t = await getTranslations({ locale, namespace: 'General' });

    return {
        title: t('title'),
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await Promise.resolve(params);

    if (!routing.locales.includes(locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return <BaseLayout locale={locale}>{children}</BaseLayout>;
}