'use client';
import Link from "next/link";
import Image from "next/image";
import {Menu, X, ChevronDown} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import React, {useState} from "react";
import {getPath} from "@/i18n/routing";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";

export default function Navbar({locale}: {locale: string}){
    const isIndex = (usePathname().replace(/\/$/, '').match(/\//g) || []).length < 2;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleAbout = () => {
        setIsAboutOpen(!isAboutOpen);
    };

    const generalTranslations = useTranslations("general");
    const componentTranslations = useTranslations("components.header");

    const menuItems = [
        {href: `/`, label: componentTranslations("index")},
        {href: `${process.env.NEXT_PUBLIC_MEDIUM_URL}`, label: "Medium", external: true},
        {href: `/${locale}${getPath('/announcements', locale)}`, label: componentTranslations("announcements")},
        {href: `/${locale}${getPath('/events', locale)}`, label: componentTranslations("events")},
        {href: `/${locale}${getPath('/useful-links', locale)}`, label: componentTranslations("links")},
        {href: `/${locale}${getPath('/gallery', locale)}`, label: componentTranslations("gallery")},
        {href: `/${locale}${getPath('/contact', locale)}`, label: componentTranslations("contact")},
        {href: `/${locale}${getPath('/faq', locale)}`, label: componentTranslations("faq")},
    ]

    return (
        <div className="w-11/12 mx-auto flex flex-wrap px-8 lg:px-4 py-5 items-center justify-between gap-8">
            <Link
                className="flex title-font font-medium items-center text-white"
                href="/"
                title={`${generalTranslations("universityName")} ${generalTranslations("studentClubName")}`}
            >
                <Image
                    src={`${isIndex ? '/theme/logo_footer.png' : '/theme/logo_no_bg.png'}`}
                    alt={`${generalTranslations("universityName")} ${generalTranslations("studentClubName")} Logo`}
                    width={100}
                    height={100}
                />
            </Link>

            <button
                className="absolute top-12 right-12 z-50 lg:hidden"
                onClick={toggleMenu}
            >
                {isMenuOpen ? <X color="#FFF" size={52}/> : <Menu color="#FFF" size={52}/>}
            </button>

            <nav className={`fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center 
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
                                className={`my-2 lg:my-0 lg:mr-5 ${isIndex ? 'text-white hover:text-gray-400' : 'text-black hover:text-primary'} font-semibold text-lg z-40 duration-300`}
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
                                    className={`flex items-center lg:mr-5 ${isIndex ? 'text-white hover:text-gray-400' : 'text-black hover:text-primary'} font-semibold text-lg`}
                                >
                                    {componentTranslations("about")}
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
                                        href={`/${locale}${getPath('/about', locale)}`}
                                        className="block px-4 py-2 text-md font-semibold text-black hover:bg-gray-100 hover:text-primary"
                                        onClick={() => {
                                            toggleMenu();
                                            toggleAbout();
                                        }}
                                    >
                                        {componentTranslations("about")}
                                    </Link>
                                    <Link
                                        href={`/${locale}${getPath('/about/team', locale)}`}
                                        className="block px-4 py-2 text-md font-semibold text-black hover:bg-gray-100 hover:text-primary"
                                        onClick={() => {
                                            toggleMenu();
                                            toggleAbout();
                                        }}
                                    >{componentTranslations("team")}
                                    </Link>
                                    <Link
                                        href={`/${locale}${getPath('/about/charter', locale)}`}
                                        className="block px-4 py-2 text-md font-semibold text-black hover:bg-gray-100 hover:text-primary"
                                        onClick={() => {
                                            toggleMenu();
                                            toggleAbout();
                                        }}
                                    >{componentTranslations("charter")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center">
                        <LanguageSwitcher/>
                        <Link
                            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-white gap-2 hover:bg-secondaryDark text-xs sm:text-sm md:text-base h-10 sm:h-12 px-4 sm:px-6 md:px-6 duration-300"
                            href={`/${locale}${getPath('/join-the-club', locale)}`}
                            rel="noopener noreferrer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                 width="24px"
                                 fill="#fff">
                                <path
                                    d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z"
                                />
                            </svg>
                            {componentTranslations("joinTheClub")}
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
