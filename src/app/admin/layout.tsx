import React from "react";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";

export default async function AdminLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang={"en"}>
        <body className="text-gray-900 bg-gray-100 font-sans antialiased">
        <NextIntlClientProvider messages={await getMessages()} locale={"en"}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
