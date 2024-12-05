import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Events({pageT, locale}) {
    const response = await fetch(`${process.env.SITE_URL}/${locale}/api/events?limit=3`)
    const events = await response.json()

    return (
            <div className = "flex flex-wrap -mx-4 -my-8" >
                    {events.map(event => {
                            const announcementDate = new Date(event.announcement_date);
                            const month = announcementDate.toLocaleString('en-US', {month: 'short'});

                            return (
                                <div key={event._id} className="py-8 px-4 lg:w-1/4 md:w-1/3 w-full">
                                    <div
                                        className="h-full flex flex-col items-start bg-white shadow-lg rounded-lg overflow-hidden">
                                        <div className="w-full  bg-gray-100 flex justify-center items-center">
                                            <Image
                                                src={process.env.SITE_URL + "/uploads/" + event._id + ".webp"}
                                                alt={locale === "tr" ? event.announcement_title_tr : event.announcement_title}
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
                                                            title={locale === "tr" ? event.announcement_title_tr : event.announcement_title}
                                                        >{locale === "tr" ? event.announcement_title_tr : event.announcement_title}</Link>
                                                    </h3>
                                                </div>
                                            </div>
                                            <p className="leading-relaxed text-sm text-gray-700 mb-4 indent-3.5">
                                                {locale === "tr" ? event.announcement_description_tr : event.announcement_description}
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
                                                    title={locale === "tr" ? event.announcement_title_tr : event.announcement_title}
                                                >{pageT("joinToEvent")}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
    )
}