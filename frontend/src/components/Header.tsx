
import Navbar from "@/components/Navbar";
import GradientBackground from "@/components/backgrounds/GradientBackground";
import IndexHero from "./IndexHero";
import VideoBackground from "@/components/backgrounds/VideoBackground";
import { getLocale, getTranslations } from "next-intl/server";

const pageName = "index";

export default async function Header({isHome=false}: {isHome?: boolean}) {
    const generalTranslations = await getTranslations('general');

    const locale = await getLocale();

    let indexHeroSetting = "video";
    if (isHome){
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/settings/index_hero`);

        if (response.ok) {
            const data = await response.json();
            indexHeroSetting = data.value;
            console.log("indexHeroSetting-----", indexHeroSetting);
        }
    }
    return (
        <header className={`text-gray-600 body-font overflow-visible flex flex-col place-content-between ${isHome ? "h-svh" : ""} items-center`}>
            <Navbar locale={locale}/>
            {isHome ? (
                indexHeroSetting === "gradient" ? (
                    <GradientBackground><IndexHero /></GradientBackground>
                ) : indexHeroSetting === "video" ? (
                    <VideoBackground><IndexHero /></VideoBackground>
                ) : (
                    <VideoBackground><IndexHero /></VideoBackground>
                )
            ) : null}
        </header>
    );
}
