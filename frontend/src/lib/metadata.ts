import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {getPath, Pathnames} from "@/i18n/routing";

export async function getMetadata(locale: string, page: string): Promise<Metadata> {
    const [generalTranslations, pageTranslations] = await Promise.all([
        getTranslations({locale, namespace:`metadata.general`}),
        getTranslations({locale, namespace:`metadata.${page}`})
    ]);

    page = page.replace("--", "/");
    if (page === "" || page === "/" || page === "index") {
        page = "";
    }

    return {
        title: pageTranslations('title') + generalTranslations("titleSuffix"),
        description: pageTranslations('description'),
        keywords: pageTranslations('keywords'),
        openGraph: {
            siteName: generalTranslations('title'),
            title: pageTranslations('title'),
            description: pageTranslations('description'),
            type: 'website'
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${getPath(`/` + page as Pathnames, locale)}`,
            languages: {
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/${getPath(`/` + page as Pathnames, "en")}`,
                tr: `${process.env.NEXT_PUBLIC_SITE_URL}/tr/${getPath(`/` + page as Pathnames, "tr")}`,
                //de: `${process.env.NEXT_PUBLIC_SITE_URL}/de/${getPath(`/` + page as Pathnames, "de")}`,
            }
        }
    }
}
