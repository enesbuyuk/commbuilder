import Link from "next/link";
import React from "react";
import {getPath} from "@/i18n/routing";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const pageName = "admin";

export default async function AdminHeader({locale}:{locale:string}){

    const [generalTranslations, contentTranslations] = await Promise.all([
        getTranslations({locale, namespace:`general`}),
        getTranslations({locale, namespace:`pages.${pageName}`})
    ]);

    return (
        <header className="body-font bg-primary text-white p-6 flex justify-between items-center">
            <Link
                className="flex title-font font-medium items-center text-gray-900 justify-around"
                href={`/${locale}/admin`}
                title={`${generalTranslations("universityName")} ${generalTranslations("studentClubName")}`}
            >
                <Image
                    src={`${process.env.NEXT_PUBLIC_BUCKET}/theme/logo_footer.png`}
                    alt={`${generalTranslations("universityName")} ${generalTranslations("studentClubName")} Logo`}
                    width={70}
                    height={70}
                />
                <span className="ml-3 text-xl font-extrabold text-white">{generalTranslations("universityName")}<br/>{generalTranslations("studentClubName")} Admin Panel</span>
            </Link>
            <nav>
                <ul className="flex space-x-6">
                    <li><Link className={"border-r-2 border-white pr-2"} href={`/${locale}`} target="_blank" >Web Site Home</Link></li>
                    <li><Link href={`/${locale}${getPath('/admin/dashboard', locale)}`} className="hover:text-gray-400 duration-300">{contentTranslations("dashboard")}</Link></li>
                    <li><Link href={`/${locale}${getPath('/admin/settings', locale)}`} className="hover:text-gray-400 duration-300">{contentTranslations("settings")}</Link></li>
                    <li><Link href={`/${locale}${getPath('/admin/sign-out', locale)}`} className="hover:text-gray-400 duration-300">{contentTranslations("signOut")}</Link></li>
                </ul>
            </nav>
        </header>
    )
}
