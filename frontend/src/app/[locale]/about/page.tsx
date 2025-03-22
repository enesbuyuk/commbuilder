import Link from "next/link";
import {getTranslations, setRequestLocale} from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import {getPath} from "@/i18n/routing";

export async function generateMetadata({params}: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("AboutPage")
    }

    return {
        title: translations.pageTranslations('title') + translations.generalTranslations("titleSuffix"),
        description: translations.pageTranslations('description'),
        openGraph: {
            siteName: translations.generalTranslations('title'),
            title: translations.pageTranslations('title'),
            description: translations.pageTranslations('description'),
            type: 'website'
        },
        alternates: {
            canonical: `/${locale}/${getPath('/about', locale)}`,
        }
    };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    setRequestLocale(locale);

    const translations = {
        pageTranslations: await getTranslations("AboutPage")
    }

    return (
        <PageLayout locale={locale} title={translations.pageTranslations("title")} description={translations.pageTranslations("description")} bg={"white"}>
            <div className="text-gray-900">
                <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{translations.pageTranslations("aboutUsTitle")}</h2>
                <p className="leading-relaxed text-base">{translations.pageTranslations("aboutUsText")}</p>
            </div>
            <div className="text-gray-900">
                <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{translations.pageTranslations("missionTitle")}</h2>
                <p className="leading-relaxed text-base">{translations.pageTranslations("missionText")}</p>
            </div>
            <div className="text-gray-900">
                <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{translations.pageTranslations("visionTitle")}</h2>
                <p className="leading-relaxed text-base">{translations.pageTranslations("visionText")}</p>
            </div>
            <div className="text-gray-900">
                <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{translations.pageTranslations("valuesTitle")}</h2>
                <p className="leading-relaxed text-base">{translations.pageTranslations("valuesText")}</p>
            </div>
            <div className="text-gray-900">
                <h2 className="text-2xl font-bold mb-4 text-secondaryDark">{translations.pageTranslations("teamTitle")}</h2>
                <p className="leading-relaxed text-base">{translations.pageTranslations("teamText")}</p>
                <Link href={"/about/team"} title={translations.pageTranslations("teamTitle")}
                      className={"inline-flex m-8 bg-primary hover:bg-secondaryDark text-white px-3 py-2 rounded-lg duration-300"}>{translations.pageTranslations("goToTeamPage")}</Link>
            </div>
            <div className="bg-primary text-white p-6 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">{translations.pageTranslations("joinOurJourneyTitle")}</h2>
                <p className="leading-relaxed text-base mb-8">{translations.pageTranslations("joinOurJourneyText")}</p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <Link
                        className="bg-white text-primary font-semibold px-6 py-2 rounded-lg transition duration-300 hover:bg-secondary hover:text-white"
                        href={"/join-the-club"}
                    >{translations.pageTranslations("joinUs")}</Link>
                </div>
            </div>
        </PageLayout>
    );
}