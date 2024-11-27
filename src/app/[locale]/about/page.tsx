import {useTranslations} from "next-intl";
import React from "react";
import Link from "next/link";
import {getTranslations, setRequestLocale} from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations({ namespace: 'AboutPage'});
    const generalT = await getTranslations({ namespace: 'General'});

    return {
        title: t('title') + generalT("titleSuffix"),
        description: t('description')
    };
}
export default function Page({params}) {
    const { locale } = Promise.resolve(params)
    setRequestLocale(locale);
    const pageT = useTranslations("AboutPage");
    return (
        <main>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="flex flex-col text-center w-full mb-20 bg-secondaryDark p-12 pt-20 text-white">
                    <h1 className="text-3xl font-bold title-font mb-4 text-white tracking-widest">{pageT("title")}</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{pageT("description")}</p>
                </div>
                {/* Content Section */}
                <div className="container px-24 py-12 items-center mx-auto flex flex-col space-y-12">
                    {/* About Section */}
                    <div className="text-gray-900">
                        <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{pageT("aboutUsTitle")}</h2>
                        <p className="leading-relaxed text-base">{pageT("aboutUsText")}</p>
                    </div>
                    <div className="text-gray-900">
                        <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{pageT("missionTitle")}</h2>
                        <p className="leading-relaxed text-base">{pageT("missionText")}</p>
                    </div>
                    <div className="text-gray-900">
                        <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{pageT("visionTitle")}</h2>
                        <p className="leading-relaxed text-base">{pageT("visionText")}</p>
                    </div>
                    <div className="text-gray-900">
                        <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{pageT("valuesTitle")}</h2>
                        <p className="leading-relaxed text-base">{pageT("valuesText")}</p>
                    </div>
                    <div className="text-gray-900">
                        <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{pageT("teamTitle")}</h2>
                        <p className="leading-relaxed text-base">{pageT("teamText")}</p>
                        <Link href={"/about/team"} title={pageT("teamTitle")} className={"inline-flex m-8 bg-primary hover:bg-secondaryDark text-white px-3 py-2 rounded-lg duration-300"}>{pageT("goToTeamPage")}</Link>
                    </div>
                    <div className="bg-primary text-white p-6 rounded-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">{pageT("joinOurJourneyTitle")}</h2>
                        <p className="leading-relaxed text-base mb-8">{pageT("joinOurJourneyText")}                        </p>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                            <Link
                                className="bg-white text-primary font-semibold px-6 py-2 rounded-lg transition duration-300 hover:bg-secondary hover:text-white"
                                href={"/join-the-club"}
                            >{pageT("joinUs")}</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}