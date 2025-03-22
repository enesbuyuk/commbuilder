import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import React, {ReactNode} from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
    children: ReactNode;
    locale: string;
};

export default async function BaseLayout({children, locale}: Props) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body className="text-gray-900 bg-gray-100 font-sans antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
            <Footer/>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}