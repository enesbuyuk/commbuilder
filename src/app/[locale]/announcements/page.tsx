import {getTranslations, setRequestLocale} from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import {Announcement} from "@/types/Announcement";
import {Suspense} from "react";
import {getPath} from "@/i18n/routing";
export const dynamic = 'force-dynamic'

export async function generateMetadata({params}: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("AnnouncementsPage")
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
            canonical: `/${locale}/${getPath('/announcements', locale)}`,
        }
    };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    // Replace setRequestLocale with the appropriate method for your i18n setup
    // For next-intl, you might use something like:
    // import { useTranslations } from 'next-intl';
    setRequestLocale(locale);
    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("AnnouncementsPage")
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/announcements`, {
        cache: 'force-cache'
    });

    const announcements: Announcement[] = await response.json();

    return (
        <PageLayout
            locale={locale}
            title={translations.pageTranslations("title")}
            description={translations.pageTranslations("description")}
        >
            <Suspense fallback={<p>Loading feed...</p>}>
                {announcements.map((announcement) => (
                    <div
                        key={announcement._id}
                        className="bg-white px-6 py-8 rounded-lg shadow-lg flex flex-wrap md:flex-nowrap w-full"
                    >
                        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                            <span className="font-semibold title-font text-gray-700">
                                {announcement.announcement_type.charAt(0).toUpperCase() + announcement.announcement_type.slice(1)}
                            </span>
                            <span className="mt-1 text-gray-500 text-sm">
                                {new Date(announcement.announcement_date).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="md:flex-grow">
                            <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                                {announcement.announcement_title[locale]}
                            </h2>
                            <p className="leading-relaxed">
                                {announcement.announcement_description[locale]}
                            </p>
                            <a href="#" className="text-indigo-500 inline-flex items-center mt-4">
                                {translations.generalTranslations("learnMore")}
                                <svg
                                    className="w-4 h-4 ml-2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </Suspense>
        </PageLayout>
    )
}