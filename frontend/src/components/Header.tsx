import Navbar from "@/components/Navbar";
import Link from "next/link";
import {getTranslations} from "next-intl/server";
import HomeTypewriter from "@/components/HomeTypewriter";

const pageName = "index";

export default async function Header({locale, indexHero}: {locale: string, indexHero: boolean}) {
    const [generalTranslations, contentTranslations] = await Promise.all([
        getTranslations({locale, namespace:"general"}),
        getTranslations({locale, namespace:`pages.${pageName}`})
    ]);

    let hero = indexHero || indexHero;

    return (
        <header className={`text-gray-600 body-font overflow-visible flex flex-col place-content-between ${hero ? "h-svh" : ""} items-center`}>
            <Navbar locale={locale}/>
            {indexHero ? (
                <>
                    <div className="container relative px-6 z-10">
                        <h1
                            className="text-center text-white uppercase tracking-widest font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl pb-2 sm:pb-4 md:pb-6 lg:pb-8"
                        >
                            {generalTranslations("universityName")}
                            <br/>
                            {generalTranslations("studentClubName")}
                        </h1>
                        <h2
                            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white text-center font-semibold mt-6 sm:mt-8 md:mt-12 lg:mt-16"
                        ><HomeTypewriter/>
                        </h2>
                    </div>

                    <div className={"flex justify-center"}>
                        <Link className={"flex flex-col items-center text-white animate-bounce duration-300"} href={"#medium-articles"}>
                            <span>{contentTranslations("meetOurClub")}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 -960 960 960" width="56px" fill="#fff">
                                <path
                                    d="M480-200 240-440l46.67-46.67 193.33 193 193.33-193L720-440 480-200Zm0-248.67-240-240 46.67-46.66 193.33 193 193.33-193L720-688.67l-240 240Z"/>
                            </svg>
                        </Link>
                    </div>
                    <video
                        src={"/theme/background.webm"}
                        autoPlay
                        muted
                        loop
                        playsInline
                        disablePictureInPicture
                        className="absolute inset-0 -z-10 w-full h-svh object-cover pointer-events-none"/>
                    <div className="absolute inset-0 bg-black/80 -z-10"></div>
                </>
            ) : null}
        </header>
    );
}
