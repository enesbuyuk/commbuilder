import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import React from "react";
import { NextIntlClientProvider } from "next-intl";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function LocaleLayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}
