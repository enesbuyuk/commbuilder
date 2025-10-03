
import Navbar from "@/components/Navbar";
import IndexHero from "./IndexHero";
import VideoBackground from "@/components/backgrounds/VideoBackground";
import GradientBackground from "@/components/backgrounds/GradientBackground";
import CountDown from "@/components/CountDown";
import { getLocale, getTranslations } from "next-intl/server";

const pageName = "index";

export default async function Header({isHome=false}: {isHome?: boolean}) {
    const generalTranslations = await getTranslations('general');

    const locale = await getLocale();

    let indexBackground = "video";
    if (isHome){
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/settings/index_background`);
        if (response.ok) {
            const data = await response.json();
            indexBackground = data.value;
        }
    }

    let indexHeroSetting = "index_hero";
    if (isHome){
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/settings/index_hero`);

        if (response.ok) {
            const data = await response.json();
            indexHeroSetting = data.value;
        }
    }

    const IndexHeroMap: Record<string, React.FC> = {
        "default": IndexHero,
        "countdown": CountDown,
    };

    const IndexBackgroundMap: Record<string, React.FC<{children: React.ReactNode}>> = {
        "video": VideoBackground,
        "gradient": GradientBackground,
    };

    const HeroComponent = IndexHeroMap[indexHeroSetting] || IndexHero;
    const BackgroundComponent = IndexBackgroundMap[indexBackground] || VideoBackground;

    return (
        <header className={`text-gray-600 body-font overflow-visible flex flex-col place-content-between ${isHome ? "h-svh" : ""} items-center`}>
            <Navbar locale={locale}/>
            {isHome ? (
                <BackgroundComponent>
                    <HeroComponent />
                </BackgroundComponent>
            ) : null}
        </header>
    );
}
