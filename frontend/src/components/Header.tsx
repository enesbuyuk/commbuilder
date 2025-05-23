"use client"

import Navbar from "@/components/Navbar";
import {usePathname} from "next/navigation";
import {useTranslations} from "next-intl";
import GradientBackground from "@/components/backgrounds/GradientBackground";
import IndexHero from "./IndexHero";
import VideoBackground from "@/components/backgrounds/VideoBackground";

const pageName = "index";

export default function Header({locale}: {locale: string}) {
    // const [generalTranslations, contentTranslations] = await Promise.all([
    //     getTranslations({locale, namespace:"general"}),
    //     getTranslations({locale, namespace:`pages.${pageName}`})
    // ]);
    const pathname = usePathname();

    const generalTranslations = useTranslations("general");
    const contentTranslations = useTranslations(`pages.${pageName}`);

    return (
        <header className={`text-gray-600 body-font overflow-visible flex flex-col place-content-between ${pathname?.substring(3).length === 0 ? "h-svh" : ""} items-center`}>
            <Navbar locale={locale}/>
            {pathname.substring(3).length === 0 ? (
                generalTranslations("indexHero") === "gradient" ? (
                    <GradientBackground><IndexHero /></GradientBackground>
                ) : generalTranslations("indexHero") === "video" ? (
                    <VideoBackground><IndexHero /></VideoBackground>
                ) : (
                    <VideoBackground><IndexHero /></VideoBackground>
                )
            ) : null}
        </header>
    );
}
