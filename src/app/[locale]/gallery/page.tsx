import {getTranslations, setRequestLocale} from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import Gallery from "@/components/Gallery";
import {getPath} from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("GalleryPage")
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
            canonical: `/${locale}/${getPath('/gallery', locale)}`,
        }
    };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    setRequestLocale(locale);

    const translations = {
        pageTranslations: await getTranslations("GalleryPage")
    }

    return (
        <PageLayout locale={locale} title={translations.pageTranslations("title")} description={translations.pageTranslations("description")}>
            <Gallery/>
        </PageLayout>
    )
}