import {getTranslations, getLocale} from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import {getMetadata} from "@/lib/metadata";
import {LinkType} from "@/types/Link";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const pageName = "links";

export async function generateMetadata() {
    return getMetadata(pageName);
}

export default async function Page() {
    const [generalTranslations, metadataTranslations, contentTranslations] = await Promise.all([
        getTranslations("general"),
        getTranslations(`metadata.${pageName}`),
        getTranslations(`pages.${pageName}`)
    ]);
    
    const locale = await getLocale();

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/links`)
    const links: LinkType[] = await response.json();

    return (
        <main className="text-center px-4 py-8 bg-gradient-to-b from-[#272727] to-black text-white flex flex-col items-center justify-center min-h-screen">
            <div className="fixed top-4 right-4 z-50 sm:top-4 sm:right-4 xs:top-2 xs:right-2">
                <LanguageSwitcher />
            </div>

            <Image
                src="/theme/logo.png"
                alt={generalTranslations("studentClubName") + " " + generalTranslations("universityName")}
                className="w-36 h-36 mx-auto rounded-full mb-4"
                width={144}
                height={144}
            />

            <h1 className="text-2xl font-bold">{generalTranslations("studentClubName")}</h1>
            <p className="text-gray-400">{generalTranslations("universityName")}</p>
            <p className="text-gray-400">{metadataTranslations("description")}</p>

            <div className="mt-8 space-y-4 w-full max-w-7xl sm:max-w-6xl md:max-w-5xl lg:max-w-4xl xl:max-w-2xl 2xl:max-w-2xl mx-auto">
                {links.length > 0 && links ? (
                    links.map((link) => (
                        <div key={link._id} className="flex flex-col w-full px-4">
                            <Link
                                href={link.url}
                                target="_blank"
                                title={link.title[locale]}
                                className="relative flex items-center justify-center gap-2 bg-black px-8 sm:px-24 py-3 rounded-lg text-white text-xl sm:text-2xl transition duration-300 transform hover:scale-105 shadow-md shadow-gray-300/10 hover:shadow-md hover:shadow-gray-300/30"
                            >
                        <span className="absolute left-6">
                            <Image
                                src={`/theme/icons/${link.icon}.svg`}
                                alt={link.title[locale]}
                                width={36}
                                height={36}
                            />
                        </span>
                                <span className="mx-auto">{link.title[locale]}</span>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No links available</p>
                )}
            </div>

            <div className="mt-12 space-y-4 w-full max-w-7xl sm:max-w-6xl md:max-w-5xl lg:max-w-4xl xl:max-w-xl 2xl:max-w-2xl mx-auto">
                    <Link
                        href="/"
                        target="_blank"
                        title={generalTranslations("universityName") + " " + generalTranslations("studentClubName")}
                        className="relative flex items-center justify-center gap-2 bg-white px-8 sm:px-24 py-3 rounded-lg text-black text-xl sm:text-2xl transition duration-300 transform hover:scale-105 shadow-md shadow-gray-300/10 hover:shadow-md hover:shadow-gray-300/30"
                    >
                        <span className="absolute left-6">
                            <Image
                                src="/theme/icons/globe.svg"
                                alt={contentTranslations("goToOurWebsite")}
                                width={36}
                                height={36}
                            />
                        </span>
                        <span className="mx-auto">{contentTranslations("goToOurWebsite")}</span>
                    </Link>
                </div>
        </main>
    )
}
