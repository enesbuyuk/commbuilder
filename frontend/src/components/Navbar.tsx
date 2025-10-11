"use client";
import React, { useState, useEffect } from 'react';
import {Menu, X, ChevronDown, ChevronUp} from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {Link} from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Navbar({locale}: {locale: string}) {
    const pathname = usePathname();
    const isIndex = (pathname.replace(/\/$/, '').match(/\//g) || []).length < 2;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const toggleAbout = () => setIsAboutOpen((prev) => !prev);

    useEffect(() => {
       // document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    }, [isMenuOpen]);

    const generalTranslations = useTranslations('general');
    const componentTranslations = useTranslations('components.header');

    const menuItems = [
        { href: `/`, label: componentTranslations('index') },
        { href: `${process.env.NEXT_PUBLIC_MEDIUM_URL}`, label: 'Medium', external: true },
        { href: `/announcements`, label: componentTranslations('announcements') },
        { href: `/events`, label: componentTranslations('events') },
        { href: `/useful-links`, label: componentTranslations('usefulLinks') },
        { href: `/gallery`, label: componentTranslations('gallery') },
        { href: `/contact`, label: componentTranslations('contact') },
        { href: `/faq`, label: componentTranslations('faq') },
    ];

    return (
        <div className="w-11/12 mx-auto flex flex-wrap px-8 lg:px-4 py-4 items-center justify-between gap-8">
            <Link href="/" title={`${generalTranslations('universityName')} ${generalTranslations('studentClubName')}`}>
                <Image
                    src={isIndex ? `${process.env.NEXT_PUBLIC_BUCKET}/theme/logo_without_text.png` : `${process.env.NEXT_PUBLIC_BUCKET}/theme/logo_no_bg.png`}
                    alt={`${generalTranslations('universityName')} Logo`}
                    width={isIndex ? 90 : 75}
                    height={isIndex ? 90 : 75}
                    priority
                />
            </Link>

            <button className="top-12 right-12 z-50 lg:hidden" onClick={toggleMenu} aria-expanded={isMenuOpen}>
                {isMenuOpen ? <X size={52} color={`#FFF`}/> : <Menu size={52} className={`text-${isIndex?`white`:`primary`}`} />}
            </button>

            <nav className={`grow fixed inset-0 bg-primary z-40 flex flex-col items-center justify-between lg:static lg:flex-row lg:bg-transparent transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 py-5 lg:py-0`}>
                <ul className="flex flex-col lg:flex-row items-center">
                    {menuItems.map(({ href, label, external }, index) => {
                        const isLastItem = (index === menuItems.length - 2);

                        return(
                            <React.Fragment key={href}>
                            {isLastItem &&
                                <li className="relative my-2 lg:my-0 lg:mr-5">
                                    <button onClick={toggleAbout} className={`flex items-center font-semibold text-lg ${isIndex?'text-white hover:text-gray-400' :'text-white hover:text-gray-400 lg:text-primary lg:hover:text-secondaryDark'} duration-300`}>
                                        {componentTranslations('about')}
                                        {isAboutOpen ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
                                    </button>
                                    {isAboutOpen && (
                                        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                            {['about', 'about--team', 'about--charter', 'links'].map((key) => {
                                                const formattedKey = key.replace('--', '/');
                                                return (
                                                    <li key={key}>
                                                        <Link
                                                            href={"/" + formattedKey as any}
                                                            className="block px-4 py-2 text-md font-semibold text-black hover:bg-gray-100"
                                                            onClick={toggleMenu}
                                                        >
                                                            {componentTranslations(key)}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </li>
                        }
                            <li key={href} className="my-2 lg:my-0 lg:mr-5">
                                <Link href={href as any} target={external ? '_blank' : undefined}
                                  rel={external ? 'noopener noreferrer' : undefined}
                                  className={`font-semibold text-lg ${isIndex ? 'text-white hover:text-gray-400' : 'text-white hover:text-gray-400 lg:text-primary lg:hover:text-secondaryDark'} duration-300`}
                                  onClick={toggleMenu}>{label}</Link>
                            </li>
                            </React.Fragment>
                        );
                    })}
                </ul>

                <div className="flex flex-col lg:flex-row items-center">
                    <LanguageSwitcher />
                    <Link href={`/join-the-club`} className="rounded-full border border-transparent bg-primary text-white hover:bg-secondaryDark text-sm px-6 py-3 transition-colors inline-flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                            <path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Z"/>
                        </svg>
                        {componentTranslations('joinTheClub')}
                    </Link>
                </div>
            </nav>
        </div>
    );
}
