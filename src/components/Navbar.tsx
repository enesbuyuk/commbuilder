'use client';
import Link from "next/link";
import Image from "next/image";
import {Menu, X} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import React, {useState} from "react";

export default function Navbar({translations, menuItems}){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="container mx-auto flex flex-wrap px-4 py-5 items-center justify-between">
            <Link
                className="flex title-font font-medium items-center text-gray-900"
                href="/"
                title={`${translations.generalTranslations.universityName} ${translations.generalTranslations.studentClubName}`}
            >
                <Image
                    src="/theme/new_logo_no_bg.png"
                    alt={`${translations.generalTranslations.universityName} ${translations.generalTranslations.studentClubName} Logo`}
                    width={85}
                    height={85}
                />
            </Link>

            <button
                className="md:hidden z-50"
                onClick={toggleMenu}
            >
                {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>

            <nav className={`
                    fixed inset-0 bg-white z-40 flex flex-col items-center justify-center 
                    md:static md:flex md:flex-row md:bg-transparent md:z-0
                    transition-all duration-300 ease-in-out
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                    md:translate-x-0
                `}>
                <div className="flex flex-col md:flex-row items-center">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            className="my-2 md:my-0 md:mr-5 text-black hover:text-primary font-semibold text-lg"
                            href={item.href}
                            {...(item.external ? {target: "_blank"} : {})}
                            onClick={toggleMenu}
                        >{item.label}</Link>
                    ))}

                    <div className="flex flex-col md:flex-row items-center">
                        <LanguageSwitcher/>
                        <Link
                            className="inline-flex items-center bg-primary hover:bg-secondary text-gray-300 hover:text-white border-0 focus:outline-none rounded text-base mt-4 md:mt-0 duration-300 px-4 py-2"
                            href={`${translations.pageTranslations.joinTheClub}`}
                            onClick={toggleMenu}
                        >
                            {translations.pageTranslations.joinTheClub}
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