import {getTranslations, setRequestLocale} from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import Gallery from "@/components/Gallery";
import {getMetadata} from "@/lib/metadata";

const pageName = "gallery";

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
        <PageLayout locale={locale} title={metadataTranslations("title")} description={metadataTranslations("description")}>
            <Gallery/>
        </PageLayout>
    )
}
