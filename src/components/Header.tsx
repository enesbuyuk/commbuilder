import Navbar from "@/components/Navbar";
import Link from "next/link";
import {getPath} from "@/i18n/routing";
import {getTranslations} from "next-intl/server";

export default async function Header({locale, indexHero}: {locale: string, indexHero: boolean}) {
    const translations = {
        generalTranslations: await getTranslations({locale, namespace: 'General'}),
        pageTranslations: await getTranslations({locale, namespace: 'IndexPage'})
    }

    let hero = indexHero || indexHero;

    return (
        <header className={`text-gray-600 body-font overflow-hidden flex flex-col place-content-between ${hero ? "h-svh" : ""} items-center`}>
            <Navbar locale={locale}/>
            {indexHero ? (
                <>
                    <div className="container relative px-6 z-10">
                        <h1
                            className="text-center text-primary uppercase tracking-widest font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl pb-2 sm:pb-4 md:pb-6 lg:pb-8"
                        >
                            {translations.generalTranslations("universityName")}
                            <br/>
                            {translations.generalTranslations("studentClubName")}
                        </h1>
                        <h2
                            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-black text-center mt-6 sm:mt-8 md:mt-12 lg:mt-16"
                        >
                            {translations.pageTranslations("welcomeMessage")}
                        </h2>
                        <div className="flex gap-3 sm:gap-4 items-center flex-col justify-center mt-8 sm:mt-10">
                            <Link
                                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-white gap-2 hover:bg-secondaryDark text-xs sm:text-sm md:text-base h-10 sm:h-12 px-4 sm:px-6 md:px-8 duration-300"
                                href={process.env.NEXT_PUBLIC_SITE_URL + "/" + locale + getPath('/join-the-club', locale)}
                                rel="noopener noreferrer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                     width="24px"
                                     fill="#fff">
                                    <path
                                        d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z"
                                    />
                                </svg>
                                {translations.generalTranslations("joinTheClub")}
                            </Link>
                            {/*<Link className={"pt-16 text-secondaryDark animate-bounce duration-300"} href={"#medium-articles"}>*/}
                            {/*    <svg xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 -960 960 960" width="56px">*/}
                            {/*        <path*/}
                            {/*            d="M480-200 240-440l46.67-46.67 193.33 193 193.33-193L720-440 480-200Zm0-248.67-240-240 46.67-46.66 193.33 193 193.33-193L720-688.67l-240 240Z"/>*/}
                            {/*    </svg>*/}
                            {/*</Link>*/}
                        </div>
                    </div>

                    <div className={"flex justify-center"}>
                        <Link className={"text-secondaryDark animate-bounce duration-300"} href={"#medium-articles"}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 -960 960 960" width="56px">
                                <path
                                    d="M480-200 240-440l46.67-46.67 193.33 193 193.33-193L720-440 480-200Zm0-248.67-240-240 46.67-46.66 193.33 193 193.33-193L720-688.67l-240 240Z"/>
                            </svg>
                        </Link>
                    </div>
                    <video
                        src={"/theme/videoplayback.webm"}
                        autoPlay
                        muted
                        loop
                        playsInline
                        disablePictureInPicture
                        className="absolute inset-0 -z-10 w-full h-svh object-cover pointer-events-none"/>
                </>
            ) : null}
        </header>
    );
}