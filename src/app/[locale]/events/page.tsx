import {getTranslations, setRequestLocale} from "next-intl/server";
import PageLayout from "@/components/PageLayout";

import Image from "next/image";
import Link from "next/link";
import {Announcement} from "@/types/Announcement";
import {Suspense} from "react";
export const dynamic = 'force-dynamic'

export async function generateMetadata() {
    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("EventsPage")
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
        pageTranslations: await getTranslations("EventsPage")
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events?limit=100`, {
        cache: 'force-cache'
    });
    const events:Announcement[] = await response.json();

    return (
        <PageLayout title={translations.pageTranslations("title")} description={translations.pageTranslations("description")}>
            <div className="flex flex-wrap -mx-4 -my-8">
                <Suspense fallback={<p>Loading feed...</p>}>
                {events.map((event:Announcement) => {
                    const announcementDate = new Date(event.announcement_date);
                    const month = announcementDate.toLocaleString('en-US', {month: 'short'});

                    return (
                        <div key={event._id} className="py-8 px-4 lg:w-1/4 md:w-1/3 w-full">
                            <div
                                className="h-full flex flex-col items-start bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="w-full  bg-gray-100 flex justify-center items-center">
                                    <Image
                                        src={process.env.NEXT_PUBLIC_SITE_URL + "/uploads/" + event._id + ".webp"}
                                        alt={event.announcement_title[locale]}
                                        className="object-cover w-full h-full"
                                        height={1200}
                                        width={900}
                                    />
                                </div>
                                <div className="w-full flex flex-col p-4">
                                    <div className="flex items-center mb-4">
                                        <div className="flex-grow">
                                            <h2 className="tracking-widest text-xs font-medium text-indigo-500 mb-1">CATEGORY</h2>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                <Link
                                                    href={event.announcement_url}
                                                    target="_blank"
                                                    title={event.announcement_title[locale]}
                                                >{event.announcement_title[locale]}</Link>
                                            </h3>
                                        </div>
                                    </div>
                                    <p className="leading-relaxed text-sm text-gray-700 mb-4 indent-3.5">
                                        {event.announcement_description[locale]}
                                    </p>
                                    <div
                                        className="flex-shrink-0 text-center border-r border-gray-200 pr-2 py-6">
                                                    <span
                                                        className="inline-block text-gray-800 text-lg font-medium">{month} {announcementDate.getDate()}, {announcementDate.getFullYear()}</span>
                                        <div
                                            className="text-gray-500 text-sm mt-1">{announcementDate.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })} - {announcementDate.toLocaleDateString('en-US', {weekday: 'long'})}</div>
                                    </div>
                                    <div className="mt-auto mx-auto">
                                        <Link
                                            className="inline-flex items-center bg-primary hover:bg-secondaryDark text-white py-2 px-4 rounded-lg text-sm transition duration-300"
                                            href={event.announcement_url}
                                            target="_blank"
                                            title={event.announcement_title[locale]}
                                        >{translations.pageTranslations("joinToEvent")}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
                }
                </Suspense>
            </div>
        </PageLayout>
    )
}