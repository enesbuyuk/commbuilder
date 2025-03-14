import React from 'react';
import {getLocale} from "next-intl/server";
import { redirect } from 'next/navigation';
import AdminHome from "@/components/admin/AdminHome";
import {getUser} from "@/utils/user";

export default async function AdminPage() {
    const locale = await getLocale();
    const user = await getUser();

    if (!user) {
        redirect(`/${locale}/admin/sign-in`);
    }

    return (
        <AdminHome locale={locale} user={user}/>
    );
}
