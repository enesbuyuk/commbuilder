import {getTranslations, setRequestLocale} from "next-intl/server";
import Faq from "@/components/Faq";
import PageLayout from "@/components/PageLayout";

export async function generateMetadata() {
    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("FaqPage")
    }

    return {
        title: translations.pageTranslations('title') + translations.generalTranslations("titleSuffix"),
        description: translations.pageTranslations('description')
    };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    setRequestLocale(locale);

    const translations = {
        pageTranslations: await getTranslations("FaqPage")
    }

    return (
        <PageLayout locale={locale} title={translations.pageTranslations("title")} description={translations.pageTranslations("description")} spaceY={"6"}>
            <Faq locale={locale}/>
        </PageLayout>
    )
}