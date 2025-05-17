import {getTranslations, setRequestLocale} from "next-intl/server";
import Faq from "@/components/Faq";
import PageLayout from "@/components/PageLayout";
import {getMetadata} from "@/lib/metadata";

const pageName = "faq";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getMetadata(locale, pageName);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    setRequestLocale(locale);

    const [metadataTranslations] = await Promise.all([
        getTranslations({locale, namespace:`metadata.${pageName}`})
    ]);

    return (
        <PageLayout title={metadataTranslations("title")} description={metadataTranslations("description")} spaceY={"6"}>
            <Faq locale={locale}/>
        </PageLayout>
    )
}
