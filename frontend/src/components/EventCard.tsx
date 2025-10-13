import Image from "next/image";
import { Link } from '@/i18n/routing';
import { Event } from "@/types/Event";
import { getLocale, getTranslations } from "next-intl/server";

interface EventCardProps {
    readonly event: Event;
}

export default async function EventCard({ event }: EventCardProps) {
    const eventDate = new Date(event.date);
    const month = eventDate.toLocaleString('en-US', { month: 'short' });
    const isEnded = new Date() > new Date(event.date);

    const locale = await getLocale();

    const contentTranslations = await getTranslations(`pages.events`);


    return (
        <div className="h-full flex flex-col items-start bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Event Image */}
            <div className="w-full bg-gray-100 flex justify-center items-center border-gray-300 border-b-[0.2px]">
                <Image
                    src={`${process.env.NEXT_PUBLIC_BUCKET}/uploads/${event._id}.webp`}
                    alt={event.title[locale] || event.title.en}
                    className="object-cover w-full h-full"
                    height={1920}
                    width={1080}
                />
            </div>

            <div className="w-full h-full flex flex-col p-6">
                {/* Event Type and Title */}
                <div className="flex items-center mb-4">
                    <div className="grow">
                        <h2 className="tracking-widest text-md font-medium text-indigo-500 mb-1">
                            {event.type[locale] || event.type.en}
                        </h2>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            <a
                                href={event.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={event.title[locale] || event.title.en}
                                className="hover:text-primary transition-colors"
                            >
                                {event.title[locale] || event.title.en}
                            </a>
                        </h3>
                    </div>
                </div>

                {/* Event Description */}
                <p className="leading-relaxed text-sm text-gray-700 mb-4 indent-3.5">
                    {event.description[locale] || event.description.en}
                </p>

                {/* Event Date and Action Button */}
                <div className="mt-auto mx-auto w-full">
                    <div className="shrink-0 text-center py-6">
                        <span className="inline-block text-gray-800 text-lg font-medium">
                            {month} {eventDate.getDate()}, {eventDate.getFullYear()}
                        </span>
                        <div className="text-gray-500 text-sm mt-1">
                            {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {eventDate.toLocaleDateString('en-US', { weekday: 'long' })}
                        </div>
                    </div>

                    {/* View Details Button */}
                    <Link
                        href={{ pathname: "/event/[id]", params: { id: event._id } }}
                        className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm transition duration-300 w-full mb-4"
                    >
                        {contentTranslations("viewDetails")}
                    </Link>
                    {isEnded ? (
                        <div
                            className="inline-flex font-semibold items-center text-gray-500 py-2 px-4 text-sm italic w-full justify-center"
                            title={event.title[locale] || event.title.en}
                        >
                            **{contentTranslations("endedEvent")}**
                        </div>
                    ) : (
                        <a
                            className="inline-flex items-center justify-center bg-primary hover:bg-secondaryDark text-white py-2 px-4 rounded-lg text-sm transition duration-300 w-full"
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={event.title[locale] || event.title.en}
                        >
                            {contentTranslations("joinEvent")}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
