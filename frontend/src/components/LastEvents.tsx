import Image from "next/image";
import Link from "next/link";
import {getTranslations} from "next-intl/server";
import IndexPageSectionLayout from "@/components/IndexPageSectionLayout";
import {Event} from "@/types/Event";

export default async function LastEvents({locale, pageName}: {locale: string, pageName: string}) {
    const contentTranslations = await getTranslations({locale, namespace:`pages.${pageName}`})

    const response = await fetch(`${process.env.BACKEND_URL}/events?limit=3`)
    const lastEvents:Event[] = await response.json();

    return (
        <IndexPageSectionLayout title={contentTranslations("lastEvents")} indexPageSectionId={"last-events"} isLastSection={true}>
            {lastEvents.map((event:Event) => {
                const eventDate = new Date(event.date);
                const month = eventDate.toLocaleString('en-US', {month: 'short'});

                return (
                    <div key={event._id} className="lg:w-1/3 md:w-1/2 w-full py-8 px-12 md:px-4 ">
                        <div
                            className="h-full flex flex-col items-start bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="w-full  bg-gray-100 flex justify-center items-center border-gray-300 border-b-[0.2px]">
                                <Image
                                    src={`/uploads/${event._id}.webp`}
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
                                            className="inline-flex font-semibold items-center text-red-800 py-2 px-4 text-sm italic"
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
            })}
        </IndexPageSectionLayout>
    )
}
