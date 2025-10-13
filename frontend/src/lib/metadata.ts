import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import {getPath, Pathnames} from "@/i18n/routing";

export async function getMetadata(page: string, dynamicPath?: string): Promise<Metadata> {

    const locale = await getLocale() || "en";
    const pageTranslations = await getTranslations({
        locale,
        namespace: `metadata.${page}`
    });

    page = page.replace("--", "/");
    if (page === "" || page === "/" || page === "index") {
        page = "";
    }

    // List of pages that are dynamic or shouldn't use getPath
    const dynamicPages = ['event-details', 'team-details', 'announcement-details'];
    const isDynamicRoute = dynamicPages.includes(page.replace(/\//g, '')) || page.includes('[') || page.includes(']');
    
    // Check if the page path exists in routing configuration
    const pagePathname = `/${page}` as Pathnames;
    
    // For dynamic routes or routes not in pathnames, use direct paths
    const getLocalizedPath = (pathLocale: string) => {
        if (isDynamicRoute && dynamicPath) {
            // For dynamic paths like /events/[id], use routing to get localized version
            // Replace the actual ID with [id] placeholder, get localized path, then replace back
            const pathParts = dynamicPath.split('/');
            const id = pathParts[pathParts.length - 1];
            const basePattern = pathParts.slice(0, -1).join('/') + '/[id]';
            
            try {
                const localizedPattern = getPath(basePattern as Pathnames, pathLocale);
                // Replace [id] with actual ID
                return localizedPattern.replace('[id]', id);
            } catch {
                return dynamicPath;
            }
        }
        if (isDynamicRoute) {
            return `/${page}`;
        }
        try {
            return getPath(pagePathname, pathLocale);
        } catch {
            return `/${page}`;
        }
    };

    // Base metadata
    const metadata: Metadata = {
        title: pageTranslations('title'),
        description: pageTranslations('description'),
        keywords: pageTranslations('keywords'),
        openGraph: {
            title: pageTranslations('title'),
            description: pageTranslations('description'),
        },
    };

    // Add alternates for all pages (static and dynamic)
    metadata.alternates = {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${getLocalizedPath(locale)}`,
        languages: {
            en: `${process.env.NEXT_PUBLIC_SITE_URL}/en${getLocalizedPath("en")}`,
            tr: `${process.env.NEXT_PUBLIC_SITE_URL}/tr${getLocalizedPath("tr")}`,
            //de: `${process.env.NEXT_PUBLIC_SITE_URL}/de${getLocalizedPath("de")}`,
        }
    };

    return metadata;
}
