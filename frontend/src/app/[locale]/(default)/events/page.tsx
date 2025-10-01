import {getTranslations, getLocale} from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import Image from "next/image";
import Link from "next/link";
import {Event} from "@/types/Event";
import {Suspense} from "react";
import {getMetadata} from "@/lib/metadata";

const pageName = "events";

export async function generateMetadata() {
    return getMetadata(pageName);
}

export default async function Page() {
    const [metadataTranslations, contentTranslations] = await Promise.all([
        getTranslations(`metadata.${pageName}`),
        getTranslations(`pages.${pageName}`)
    ]);

    const locale = await getLocale();

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/events`, {
    cache: 'no-store'
    });
    const json = await response.json();
    const events: Event[] = Array.isArray(json) ? json : json.data || [];

    return (
        <PageLayout title={metadataTranslations("title")} description={metadataTranslations("description")}>
            <div className="flex flex-wrap -mx-4 -my-8">
                <Suspense fallback={<p>Loading feed...</p>}>
                {events.map((event:Event) => {
                    const eventDate = new Date(event.date);
                    const month = eventDate.toLocaleString('en-US', {month: 'short'});

                    return (
                        <div key={event._id} className="py-8 px-4 lg:w-1/4 md:w-1/3 w-full">
                            <div
                                className="h-full flex flex-col items-start bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="w-full  bg-gray-100 flex justify-center items-center border-gray-300 border-b-[0.2px]">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BUCKET}/uploads/${event._id}.webp`}
                                        alt={event.title[locale]}
                                        className="object-cover w-full h-full"
                                        height={1920}
                                        width={1080}
                                    />
                                </div>
                                <div className="w-full h-full flex flex-col p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="flex-grow">
                                            <h2 className="tracking-widest text-md font-medium text-indigo-500 mb-1">{event.type[locale]}</h2>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                <Link
                                                    href={event.url}
                                                    target="_blank"
                                                    title={event.title[locale]}
                                                >{event.title[locale]}</Link>
                                            </h3>
                                        </div>
                                    </div>
                                    <p className="leading-relaxed text-sm text-gray-700 mb-4 indent-3.5">
                                        {event.description[locale]}
                                    </p>
                                    <div className="mt-auto mx-auto">
                                        <div className="flex-shrink-0 text-center py-6">
                                                    <span
                                                        className="inline-block text-gray-800 text-lg font-medium">{month} {eventDate.getDate()}, {eventDate.getFullYear()}</span>
                                            <div
                                                className="text-gray-500 text-sm mt-1">{eventDate.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })} - {eventDate.toLocaleDateString('en-US', {weekday: 'long'})}</div>
                                        </div>
                                        {new Date() > new Date(event.date) ? (
                                            <div
                                                className="inline-flex font-semibold items-center text-gray-500 py-2 px-4 text-sm italic"
                                                title={event.title[locale]}
                                            >**{contentTranslations("endedEvent")}
                                            </div>
                                        ) : (
                                            <Link
                                                className="inline-flex items-center bg-primary hover:bg-secondaryDark text-white py-2 px-4 rounded-lg text-sm transition duration-300"
                                                href={event.url}
                                                target="_blank"
                                                title={event.title[locale]}
                                            >
                                                {contentTranslations("joinToEvent")}
                                            </Link>
                                        )}
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
