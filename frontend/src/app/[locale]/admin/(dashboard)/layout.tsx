import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import {getLocale} from "next-intl/server";

export default async function AdminLayout({children}: { children: React.ReactNode }) {
    const locale = await getLocale();
    return (
        <main>
            <AdminHeader locale={locale}/>
            <section className={`text-gray-600 body-font overflow-hidden py-24`}>
                <div className="flex flex-col">
                    {children}
                </div>
            </section>
        </main>
    )
}
