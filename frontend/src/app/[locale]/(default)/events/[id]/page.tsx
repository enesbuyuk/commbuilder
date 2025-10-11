import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Event } from "@/types/Event";
import CountDown from "@/components/CountDown";

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
            <div className="min-h-screen bg-primary flex items-center justify-center px-4">
                <div className="text-center backdrop-blur-xl bg-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl max-w-2xl">
                    <div className="mb-6">
                        <svg className="w-24 h-24 mx-auto text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                        {t("notFound")}
                    </h1>
                    <p className="text-white/80 mb-8 text-lg">{t("notFoundDescription")}</p>
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t("backToEvents")}
                    </Link>
                </div>
            </div>
        );
    }

    const eventDate = new Date(event.date);
    const isEnded = eventDate < new Date();
    const month = eventDate.toLocaleDateString("en-US", { month: "long" });

    return (
            <main className="min-h-screen bg-primary">
                {/* Countdown Section */}
                <section className="relative overflow-hidden bg-primary">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
                    <CountDown eventId={id} />
                </section>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                    {/* Back Button */}
                    <Link
                        href="/events"
                        className="group inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-all duration-300 backdrop-blur-sm bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl border border-white/20 hover:border-white/40"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-semibold">{t("backToEvents")}</span>
                    </Link>

                    {/* Event Card */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl overflow-hidden border border-white/20 mb-12">
                        {/* Hero Image */}
                        <div className="relative h-96 w-full overflow-hidden group">
                            <Image
                                src={process.env.NEXT_PUBLIC_BUCKET + "/uploads/" + event._id + ".webp" || "/theme/default-image.webp"}
                                alt={event.title[locale] || event.title.en}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            
                            {/* Event Type Badge */}
                            {event.type && (
                                <div className="absolute top-6 right-6">
                                    <span className="backdrop-blur-xl bg-gradient-to-r from-orange-500/90 to-pink-600/90 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl border border-white/20 animate-pulse">
                                        {event.type[locale] || event.type.en}
                                    </span>
                                </div>
                            )}

                            {/* Event Title Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-2xl leading-tight">
                                    {event.title[locale] || event.title.en}
                                </h1>
                            </div>
                        </div>

                        {/* Event Content */}
                        <div className="p-8 md:p-12">
                            {/* Event Date */}
                            <div className="flex items-center gap-4 mb-8 backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white/60 text-sm font-semibold uppercase tracking-wide">{t("eventDate")}</p>
                                    <p className="text-white text-xl font-bold">
                                        {month} {eventDate.getDate()}, {eventDate.getFullYear()}
                                    </p>
                                    <p className="text-white/80 text-sm">
                                        {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>

                            {/* Event Description */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-1 h-8 bg-gradient-to-b from-orange-500 to-pink-600 rounded-full"></span>
                                    {t("eventDescription")}
                                </h2>
                                <p className="text-white/90 leading-relaxed text-lg backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                                    {event.description[locale] || event.description.en}
                                </p>
                            </div>

                            {/* Speakers Section */}
                            {event.speakers && event.speakers.length > 0 && (
                                <div className="mb-10">
                                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                        <span className="w-1 h-8 bg-gradient-to-b from-orange-500 to-pink-600 rounded-full"></span>
                                        {t("speakers")}
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {event.speakers.map((speaker, index) => (
                                            <div 
                                                key={speaker._id} 
                                                className="group backdrop-blur-sm bg-white/5 hover:bg-white/10 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-1"
                                                style={{ animationDelay: `${index * 100}ms` }}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 shadow-lg shrink-0">
                                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-xl text-white mb-1 group-hover:text-orange-400 transition-colors">
                                                            {speaker.name[locale] || speaker.name.en}
                                                        </h3>
                                                        <p className="text-white/70 text-sm">
                                                            {speaker.title[locale] || speaker.title.en}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Schedule Section */}
                            {event.schedule && event.schedule.length > 0 && (
                                <div className="mb-10">
                                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                        <span className="w-1 h-8 bg-gradient-to-b from-orange-500 to-pink-600 rounded-full"></span>
                                        {t("schedule")}
                                    </h2>
                                    <div className="space-y-4">
                                        {event.schedule.map((item, index) => {
                                            const speaker = event.speakers?.find(s => s._id === item.speakerId);
                                            return (
                                                <div 
                                                    key={`${item.time}-${item.speakerId}`} 
                                                    className="group relative backdrop-blur-sm bg-white/5 hover:bg-white/10 rounded-2xl p-6 border-l-4 border-orange-500 hover:border-pink-600 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20"
                                                    style={{ animationDelay: `${index * 100}ms` }}
                                                >
                                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 shadow-lg">
                                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-lg font-bold text-orange-400">{item.time}</span>
                                                        </div>
                                                        {speaker && (
                                                            <span className="text-sm text-white/70 backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                                                👤 {speaker.name[locale] || speaker.name.en}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                                        {item.topic[locale] || item.topic.en}
                                                    </h3>
                                                    <p className="text-white/80 leading-relaxed">
                                                        {item.description[locale] || item.description.en}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Action Button */}
                            <div className="mt-12 text-center">
                                {isEnded ? (
                                    <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-xl">
                                        <div className="flex items-center justify-center gap-3 mb-4">
                                            <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-white/80 text-xl font-semibold italic">
                                            {t("eventEnded")}
                                        </p>
                                    </div>
                                ) : (
                                    <Link
                                        href={event.url}
                                        target="_blank"
                                        className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold text-xl py-6 px-12 rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/20"
                                    >
                                        <span>{t("joinEvent")}</span>
                                        <svg className="w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
        </main>    
    );
}
