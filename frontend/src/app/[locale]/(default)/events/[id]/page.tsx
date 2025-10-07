import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Event } from "@/types/Event";

interface EventDetailPageProps {
    params: Promise<{
        locale: string;
        id: string;
    }>;
}

async function fetchEvent(id: string): Promise<Event | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/events/${id}`);

        if (!res.ok) {
            return null;
        }

        return res.json();
    } catch (error) {
        console.error("Failed to fetch event:", error);
        return null;
    }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    const { locale, id } = await params;
    const t = await getTranslations(`pages.events`);
    
    const event = await fetchEvent(id);

    if (!event) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {t("notFound")}
                </h1>
                <Link
                    href="/events"
                    className="inline-block bg-primary hover:bg-secondaryDark text-white py-2 px-6 rounded-lg transition duration-300"
                >
                    {t("backToEvents")}
                </Link>
            </div>
        );
    }

    const eventDate = new Date(event.date);
    const isEnded = eventDate < new Date();
    const month = eventDate.toLocaleDateString("en-US", { month: "long" });

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Back Button */}
                <Link
                    href="/events"
                    className="inline-flex items-center text-primary hover:text-secondaryDark mb-6 transition duration-300"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t("backToEvents")}
                </Link>

                {/* Event Header */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className="relative h-64 w-full">
                        <Image
                            src={event.image || "/theme/default-image.webp"}
                            alt={event.title[locale] || event.title.en}
                            fill
                            className="object-cover"
                        />
                        {event.type && (
                            <span className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                                {event.type[locale] || event.type.en}
                            </span>
                        )}
                    </div>

                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {event.title[locale] || event.title.en}
                        </h1>

                        {/* Event Date */}
                        <div className="flex items-center text-gray-600 mb-6">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-lg">
                                {month} {eventDate.getDate()}, {eventDate.getFullYear()} - {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>

                        {/* Event Description */}
                        <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                            {event.description[locale] || event.description.en}
                        </p>

                        {/* Speakers Section */}
                        {event.speakers && event.speakers.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("speakers")}</h2>
                                <div className="space-y-4">
                                    {event.speakers.map((speaker) => (
                                        <div key={speaker._id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <svg className="w-8 h-8 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-900">
                                                    {speaker.name[locale] || speaker.name.en}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {speaker.title[locale] || speaker.title.en}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Schedule Section */}
                        {event.schedule && event.schedule.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("schedule")}</h2>
                                <div className="space-y-4">
                                    {event.schedule.map((item) => {
                                        const speaker = event.speakers?.find(s => s._id === item.speakerId);
                                        return (
                                            <div key={`${item.time}-${item.speakerId}`} className="border-l-4 border-indigo-500 pl-4 py-3 bg-gray-50 rounded-r-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-bold text-indigo-600">{item.time}</span>
                                                    {speaker && (
                                                        <span className="text-sm text-gray-600">
                                                            {speaker.name[locale] || speaker.name.en}
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {item.topic[locale] || item.topic.en}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {item.description[locale] || item.description.en}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Action Button */}
                        {isEnded ? (
                            <div className="text-center py-4 text-gray-500 italic font-semibold">
                                {t("eventEnded")}
                            </div>
                        ) : (
                            <Link
                                href={event.url}
                                target="_blank"
                                className="block text-center bg-primary hover:bg-secondaryDark text-white py-3 px-6 rounded-lg text-lg transition duration-300"
                            >
                                {t("joinEvent")}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
    );
}
