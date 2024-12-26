'use client';
import Link from "next/link";
import Image from "next/image";
import {Menu, X, ChevronDown} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import React, {useState} from "react";
import {getPath} from "@/i18n/routing";
import {useTranslations} from "next-intl";

export default function Navbar({locale}: {locale: string}){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleAbout = () => {
        setIsAboutOpen(!isAboutOpen);
    };

    const translations = {
        generalTranslations: useTranslations("General"),
        pageTranslations: useTranslations("Header")
    }

    const menuItems = [
        {href: `${process.env.NEXT_PUBLIC_SITE_URL}`, label: translations.pageTranslations("index")},
        {href: `${process.env.NEXT_PUBLIC_MEDIUM_URL}`, label: "Medium", external: true},
        {href: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${getPath('/announcements', locale)}`, label: translations.pageTranslations("announcements")},
        {href: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${getPath('/events', locale)}`, label: translations.pageTranslations("events")},
        {href: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${getPath('/useful-links', locale)}`, label: translations.pageTranslations("links")},
        {href: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${getPath('/gallery', locale)}`, label: translations.pageTranslations("gallery")},
        {href: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${getPath('/contact', locale)}`, label: translations.pageTranslations("contact")},
        {href: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${getPath('/faq', locale)}`, label: translations.pageTranslations("faq")},
    ];

    return (
        <div className="container mx-auto flex flex-wrap px-8 py-5 items-center justify-between gap-8">
            <Link
                className="flex title-font font-medium items-center text-gray-900"
                href="/"
                title={`${translations.generalTranslations("universityName")} ${translations.generalTranslations("studentClubName")}`}
            >
                <Image
                    src="/theme/logo_no_bg.png"
                    alt={`${translations.generalTranslations("universityName")} ${translations.generalTranslations("studentClubName")} Logo`}
                    width={100}
                    height={100}
                />
            </Link>

            <button
                className="absolute top-12 right-12 z-50 lg:hidden"
                onClick={toggleMenu}
            >
                {isMenuOpen ? <X size={52}/> : <Menu size={52}/>}
            </button>

            <nav className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center 
                    lg:static lg:flex lg:flex-row lg:bg-transparent
                    transition-all duration-300 ease-in-out
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                    lg:translate-x-0
                    flex-grow
                    overflow-visible
                `}>
                <div className="flex flex-col lg:flex-row justify-between items-center w-full px-4">
                    <div className="flex flex-col lg:flex-row items-center">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                className="my-2 lg:my-0 lg:mr-5 text-black hover:text-primary font-semibold text-lg z-40"
                                href={item.href}
                                {...(item.external ? {target: "_blank"} : {})}
                                onClick={toggleMenu}
                                title={item.label}
                            >{item.label}</Link>
                        ))}

                        {/* About Dropdown */}
                        <div className="relative group">
                            <div className="peer my-2 lg:my-0">
                                <button
                                    onClick={toggleAbout}
                                    className="flex items-center lg:mr-5 text-black hover:text-primary font-semibold text-lg"
                                >
                                    {translations.pageTranslations("about")}
                                    <ChevronDown className="ml-1 w-4 h-4" />
                                </button>
                            </div>

                            <div className={`
                                ${isAboutOpen ? 'block' : 'hidden'} 
                                lg:hidden
                                peer-hover:block
                                hover:block
                                absolute 
                                left-0 
                                mt-0
                                w-48 
                                bg-white 
                                border 
                                border-gray-200 
                                rounded-md 
                                shadow-lg 
                                z-50
                                lg:mt-0
                            `}>
                                <div className="py-1">
                                    <Link
                                        href={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${getPath('/about', locale)}`}
                                        className="block px-4 py-2 text-md font-semibold text-black hover:bg-gray-100 hover:text-primary"
                                        onClick={() => {
                                            toggleMenu();
                                            toggleAbout();
                                        }}
                                    >
                                        {translations.pageTranslations("about")}
                                    </Link>
                                    <Link
                                        href={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${getPath('/about/team', locale)}`}
                                        className="block px-4 py-2 text-md font-semibold text-black hover:bg-gray-100 hover:text-primary"
                                        onClick={() => {
                                            toggleMenu();
                                            toggleAbout();
                                        }}
                                    >{translations.pageTranslations("team")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center">
                        <LanguageSwitcher/>
                        <Link
                            className="inline-flex items-center bg-primary hover:bg-secondaryDark text-gray-300 hover:text-white border-0 focus:outline-none rounded text-xl mt-4 lg:mt-0 duration-300 px-4 py-2"
                            href={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${getPath('/join-the-club', locale)}`}
                            onClick={toggleMenu}
                        >{translations.pageTranslations("joinTheClub")}
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4 ml-1"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}