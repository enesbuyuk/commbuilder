import Image from "next/image";
import Link from "next/link";
import React from "react";
import {getTranslations} from "next-intl/server";
import {Announcement} from "@/types/Announcement";
import IndexPageSectionLayout from "@/components/IndexPageSectionLayout";

export default async function LastEvents({locale}: {locale: string}) {
    const translations = {
        pageTranslations: await getTranslations("IndexPage")
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events?limit=3`)
    const lastEvents = await response.json()

    return (
        <IndexPageSectionLayout title={translations.pageTranslations("lastEvents")} indexPageSectionId={"last-events"} isLastSection={true}>
            {lastEvents.map((event:Announcement) => {
                const announcementDate = new Date(event.announcement_date);
                const month = announcementDate.toLocaleString('en-US', {month: 'short'});

                return (
                    <div key={event._id} className="lg:w-1/3 md:w-1/2 w-full py-8 px-12 md:px-4 ">
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
                                <div className="flex-shrink-0 text-center border-r border-gray-200 pr-2 py-6">
                                                    <span
                                                        className="inline-block text-gray-800 text-lg font-medium">{month} {announcementDate.getDate()}, {announcementDate.getFullYear()}</span>
                                    <div
                                        className="text-gray-500 text-sm mt-1">{announcementDate.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })} - {announcementDate.toLocaleDateString('en-US', {weekday: 'long'})}</div>
                                </div>
                                <div className="mt-auto mx-auto">
                                    {new Date() > new Date(event.announcement_date) ? (
                                        <div
                                            className="inline-flex font-semibold items-center text-red-800 py-2 px-4 text-sm italic"
                                            title={event.announcement_title[locale]}
                                        >**{translations.pageTranslations("endedEvent")}
                                        </div>
                                    ) : (
                                        <Link
                                            className="inline-flex items-center bg-primary hover:bg-secondaryDark text-white py-2 px-4 rounded-lg text-sm transition duration-300"
                                            href={event.announcement_url}
                                            target="_blank"
                                            title={event.announcement_title[locale]}
                                        >
                                            {translations.pageTranslations("joinToEvent")}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </IndexPageSectionLayout>
    )
}