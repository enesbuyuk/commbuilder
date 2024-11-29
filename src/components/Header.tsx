import Link from "next/link";
import Image from "next/image";
import {useTranslations} from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {getPath} from "@/i18n/routing";

export function Header({locale}) {
    const tPage = useTranslations("Header");
    const tGeneral = useTranslations("General");
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href={"/"}
                      title={tGeneral("universityName") + " " + tGeneral("studentClubName")}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Image src="/theme/logo.png"
                           alt={tGeneral("universityName") + " " + tGeneral("studentClubName") + " Logo"} width={270}
                           height={45}/>
                </Link>
                <nav
                    className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                    <Link className="mr-5 text-black hover:text-primary font-semibold text-lg"
                          href={"/"}>{tPage("index")}</Link>
                    <Link className="mr-5 text-black hover:text-primary font-semibold text-lg"
                          href={"https://medium.iucs.net"} target={"_blank"}>Medium</Link>
                    <Link className="mr-5 text-black hover:text-primary font-semibold text-lg"
                          href={process.env.SITE_URL + "/" + locale + getPath('/announcements', locale)}>{tPage("announcements")}</Link>
                    <Link className="mr-5 text-black hover:text-primary font-semibold text-lg"
                          href={process.env.SITE_URL + "/" + locale + getPath('/events', locale)}>{tPage("events")}</Link>
                    <Link className="mr-5 text-black hover:text-primary font-semibold text-lg"
                          href={process.env.SITE_URL + "/" + locale + getPath('/useful-links', locale)}>{tPage("links")}</Link>
                    <Link className="mr-5 text-black hover:text-primary font-semibold text-lg"
                          href={process.env.SITE_URL + "/" + locale + getPath('/gallery', locale)}>{tPage("gallery")}</Link>
                    <Link className="mr-5 text-black hover:text-primary font-semibold text-lg"
                          href={process.env.SITE_URL + "/" + locale + getPath('/about', locale)}>{tPage("about")}</Link>
                    <Link className="mr-5 text-black hover:text-primary font-semibold text-lg"
                          href={process.env.SITE_URL + "/" + locale + getPath('/contact', locale)}>{tPage("contact")}</Link>
                </nav>
                <LanguageSwitcher/>
                <Link
                    className="inline-flex items-center bg-primary hover:bg-secondary text-gray-300 hover:text-white border-0 focus:outline-none rounded text-base mt-4 md:mt-0 duration-300 px-4 py-2"
                    href={process.env.SITE_URL + "/" + locale + getPath('/join-the-club', locale)}>{tPage("joinTheClub")}
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                         className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </Link>
            </div>
        </header>
    )
}