'use client';
import Link from "next/link";
import React from "react";
import {getPath} from "@/i18n/routing";
import {useTranslations} from "next-intl";
import Image from "next/image";

export default function AdminHeader({locale}:{locale:string}){
    const translations = {
        generalTranslations: useTranslations("General"),
        pageTranslations: useTranslations("AdminPage")
    }

    console.log(process.env.NEXT_PUBLIC_SITE_URL)
    return (
        <header className="body-font bg-primary text-white p-6 flex justify-between items-center">
            <Link
                className="flex title-font font-medium items-center text-gray-900 justify-around"
                href={process.env.NEXT_PUBLIC_SITE_URL+"/"+locale+"/admin"}
                title={`${translations.generalTranslations("universityName")} ${translations.generalTranslations("studentClubName")}`}
            >
                <Image
                    src="/theme/logo_footer.png"
                    alt={`${translations.generalTranslations("universityName")} ${translations.generalTranslations("studentClubName")} Logo`}
                    width={70}
                    height={70}
                />
                <span className="ml-3 text-xl font-extrabold text-white">{translations.generalTranslations("universityName")}<br/>{translations.generalTranslations("studentClubName")} Admin Panel</span>
            </Link>
            <nav>
                <ul className="flex space-x-6">
                    <li><Link className={"border-r-2 border-white pr-2"} href={process.env.NEXT_PUBLIC_SITE_URL+"/"+locale} target="_blank" >Web Site Home</Link></li>
                    <li><Link href={process.env.NEXT_PUBLIC_SITE_URL + "/" + locale + getPath('/admin/dashboard', locale)} className="hover:text-gray-400 duration-300">{translations.pageTranslations("dashboard")}</Link></li>
                    <li><Link href={process.env.NEXT_PUBLIC_SITE_URL + "/" + locale + getPath('/admin/settings', locale)} className="hover:text-gray-400 duration-300">{translations.pageTranslations("settings")}</Link></li>
                    <li><Link href={process.env.NEXT_PUBLIC_SITE_URL + "/" + locale + getPath('/admin/sign-out', locale)} className="hover:text-gray-400 duration-300">{translations.pageTranslations("signOut")}</Link></li>
                </ul>
            </nav>
        </header>
    )
}
