
import Navbar from "@/components/Navbar";
import IndexHero from "./IndexHero";
import VideoBackground from "@/components/backgrounds/VideoBackground";
import GradientBackground from "@/components/backgrounds/GradientBackground";
import CountDown from "@/components/CountDown";
import { getLocale, getTranslations } from "next-intl/server";

const pageName = "index";

interface HeaderProps {
    page?: string;
    children?: React.ReactNode;
}

export default async function Header({ page = "", children }: HeaderProps) {
    const generalTranslations = await getTranslations('general');

    const locale = await getLocale();

    let indexBackground = "video";
    if (page === "home") {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/settings/index_background`);
        if (response.ok) {
            const data = await response.json();
            indexBackground = data.value;
        }
    } else if (page === "event") {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/settings/event_background`);
        if (response.ok) {
            const data = await response.json();
            indexBackground = data.value;
        }
    }

    let indexHeroSetting = "index_hero";
    if (page === "home") {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/settings/index_hero`);

        if (response.ok) {
            const data = await response.json();
            indexHeroSetting = data.value;
        }
    }

    const IndexHeroMap: Record<string, React.FC> = {
        "default": IndexHero,
        "countdown": () => <CountDown eventId="" />,
    };

    const IndexBackgroundMap: Record<string, React.FC<{ children: React.ReactNode }>> = {
        "video": VideoBackground,
        "gradient": GradientBackground,
    };

    const HeroComponent = IndexHeroMap[indexHeroSetting] || IndexHero;
    const BackgroundComponent = IndexBackgroundMap[indexBackground] || VideoBackground;

    return (
        <header className={`text-gray-600 body-font overflow-visible flex flex-col place-content-between ${page === "home" ? "h-svh" : ""} items-center`}>
            <Navbar page={page} />
            {page === "home" ? (
                <BackgroundComponent>
                    <HeroComponent />
                </BackgroundComponent>
            ) : page === "event" ? (
                <BackgroundComponent>
                    {children}
                </BackgroundComponent>
            ) : null}
        </header>
    );
}
