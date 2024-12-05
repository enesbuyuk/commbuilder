import React from 'react';
import {useTranslations} from "next-intl";
import {getPath} from "@/i18n/routing";
import Navbar from "@/components/Navbar";

export function Header({locale}) {
    const translations = {
        generalTranslations: useTranslations("General"),
        pageTranslations: useTranslations("Header")
    }

    const menuItems = [
        {href: `${process.env.SITE_URL}`, label: translations.pageTranslations("index")},
        {href: "https://medium.iucs.net", label: "Medium", external: true},
        {href: `${process.env.SITE_URL}/${locale}${getPath('/announcements', locale)}`, label: translations.pageTranslations("announcements")},
        {href: `${process.env.SITE_URL}/${locale}${getPath('/events', locale)}`, label: translations.pageTranslations("events")},
        {href: `${process.env.SITE_URL}/${locale}${getPath('/useful-links', locale)}`, label: translations.pageTranslations("links")},
        {href: `${process.env.SITE_URL}/${locale}${getPath('/gallery', locale)}`, label: translations.pageTranslations("gallery")},
        {href: `${process.env.SITE_URL}/${locale}${getPath('/about', locale)}`, label: translations.pageTranslations("about")},
        {href: `${process.env.SITE_URL}/${locale}${getPath('/contact', locale)}`, label: translations.pageTranslations("contact")},
        {href: `${process.env.SITE_URL}/${locale}${getPath('/faq', locale)}`, label: translations.pageTranslations("faq")},
    ];

    return (
        <header className="text-gray-600 body-font">
            <Navbar translations={{
                pageTranslations: {
                    index: translations.pageTranslations("index"),
                    announcements: translations.pageTranslations("announcements"),
                    events: translations.pageTranslations("events"),
                    links: translations.pageTranslations("links"),
                    gallery: translations.pageTranslations("gallery"),
                    about: translations.pageTranslations("about"),
                    contact: translations.pageTranslations("contact"),
                    faq: translations.pageTranslations("faq"),
                    joinTheClub: translations.pageTranslations("joinTheClub")
                },
                generalTranslations: {
                    universityName: translations.generalTranslations("universityName"),
                    studentClubName: translations.generalTranslations("studentClubName")
                }
            }} menuItems={menuItems}/>
        </header>
    );
}