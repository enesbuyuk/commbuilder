import Link from "next/link";
import {getTranslations, setRequestLocale} from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import {getMetadata} from "@/lib/metadata";

const pageName = "about";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getMetadata(locale, pageName);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    setRequestLocale(locale);

    const [metadataTranslations, contentTranslations] = await Promise.all([
        getTranslations({locale, namespace:`metadata.${pageName}`}),
        getTranslations({locale, namespace:`pages.${pageName}`})
    ]);

    return (
        <PageLayout title={metadataTranslations("title")} description={metadataTranslations("description")} bg={"white"}>
            <div className="text-gray-900">
                <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{contentTranslations("aboutUsTitle")}</h2>
                <p className="leading-relaxed text-base">{contentTranslations("aboutUsText")}</p>
            </div>
            <div className="text-gray-900">
                <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{contentTranslations("missionTitle")}</h2>
                <p className="leading-relaxed text-base">{contentTranslations("missionText")}</p>
            </div>
            <div className="text-gray-900">
                <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{contentTranslations("visionTitle")}</h2>
                <p className="leading-relaxed text-base">{contentTranslations("visionText")}</p>
            </div>
            <div className="text-gray-900">
                <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{contentTranslations("valuesTitle")}</h2>
                <p className="leading-relaxed text-base">{contentTranslations("valuesText")}</p>
            </div>
            <div className="text-gray-900">
                <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{contentTranslations("teamTitle")}</h2>
                <p className="leading-relaxed text-base">{contentTranslations("teamText")}</p>
                <Link href={"/about/team"} title={contentTranslations("teamTitle")}
                      className={"inline-flex m-8 bg-primary hover:bg-secondaryDark text-white px-3 py-2 rounded-lg duration-300"}>{contentTranslations("goToTeamPage")}</Link>
            </div>
            <div className="bg-primary text-white p-6 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">{contentTranslations("joinOurJourneyTitle")}</h2>
                <p className="leading-relaxed text-base mb-8">{contentTranslations("joinOurJourneyText")}</p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <Link
                        className="bg-white text-primary font-semibold px-6 py-2 rounded-lg transition duration-300 hover:bg-secondary hover:text-white"
                        href={"/join-the-club"}
                    >{contentTranslations("joinUs")}</Link>
                </div>
            </div>
        </PageLayout>
    );
}
