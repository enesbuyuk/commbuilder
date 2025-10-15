import Image from "next/image";
import NextLink from "next/link";
import { getTranslations } from "next-intl/server";
import { Event } from "@/types/Event";
import CountDown from "@/components/CountDown";
import { getMetadata } from "@/lib/metadata";
import { Link } from "@/i18n/routing";
import Header from "@/components/Header";
import SpeakerAvatar from "@/components/SpeakerAvatar";

const pageName = "event-details";

interface EventDetailPageProps {
    params: Promise<{
        locale: string;
        id: string;
    }>;
}

export async function generateMetadata({ params }: EventDetailPageProps) {
    const { id } = await params;
    return getMetadata(pageName, `/event/${id}`);
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

    // Convert to Turkey timezone (UTC+3)
    const eventDate = new Date(event.date);
    const isEnded = eventDate < new Date();

    // Format date in Turkey timezone
    const turkeyDateOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Istanbul',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    const month = eventDate.toLocaleDateString("en-US", {
        timeZone: 'Europe/Istanbul',
        month: "long"
    });

    const day = eventDate.toLocaleDateString("en-US", {
        timeZone: 'Europe/Istanbul',
        day: "numeric"
    });

    const year = eventDate.toLocaleDateString("en-US", {
        timeZone: 'Europe/Istanbul',
        year: "numeric"
    });

    const time = eventDate.toLocaleTimeString("en-US", {
        timeZone: 'Europe/Istanbul',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <>
            <Header page={"event"} >
                <CountDown eventId={id} />
            </Header>
            <main className="min-h-screen bg-primary">
                <div className="container mx-auto px-4 py-8 max-w-8xl">
                    {/* Navigation Bar with Back Button and Share Buttons */}
                    <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
                        {/* Back Button */}
                        <Link
                            href="/events"
                            className="group inline-flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300 backdrop-blur-sm bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl border border-white/20 hover:border-white/40"
                        >
                            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="font-semibold">{t("backToEvents")}</span>
                        </Link>

                        {/* Share Buttons */}
                        <div className="flex items-center gap-3">
                            <span className="text-white/80 text-sm font-semibold mr-2 hidden sm:inline">{t("share")}</span>

                            {/* Twitter/X Share */}
                            <NextLink
                                href={`https://x.com/intent/tweet?text=${encodeURIComponent(event.title[locale] || event.title.en)}&url=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL + '/' + locale + '/events/' + id)}`}
                                target="_blank"
                                className="group flex items-center justify-center w-10 h-10 rounded-lg backdrop-blur-sm bg-white/10 hover:bg-[#1DA1F2]/20 border border-white/20 hover:border-[#1DA1F2]/50 transition-all duration-300"
                                title="Share on X"
                            >
                                <svg className="w-5 h-5 text-white group-hover:text-[#1DA1F2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </NextLink>

                            {/* Facebook Share */}
                            <NextLink
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL + '/' + locale + '/events/' + id)}`}
                                target="_blank"
                                className="group flex items-center justify-center w-10 h-10 rounded-lg backdrop-blur-sm bg-white/10 hover:bg-[#1877F2]/20 border border-white/20 hover:border-[#1877F2]/50 transition-all duration-300"
                                title="Share on Facebook"
                            >
                                <svg className="w-5 h-5 text-white group-hover:text-[#1877F2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </NextLink>

                            {/* LinkedIn Share */}
                            <NextLink
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL + '/' + locale + '/events/' + id)}`}
                                target="_blank"
                                className="group flex items-center justify-center w-10 h-10 rounded-lg backdrop-blur-sm bg-white/10 hover:bg-[#0A66C2]/20 border border-white/20 hover:border-[#0A66C2]/50 transition-all duration-300"
                                title="Share on LinkedIn"
                            >
                                <svg className="w-5 h-5 text-white group-hover:text-[#0A66C2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </NextLink>

                            {/* WhatsApp Share */}
                            <NextLink
                                href={`https://wa.me/?text=${encodeURIComponent((event.title[locale] || event.title.en) + ' - ' + process.env.NEXT_PUBLIC_SITE_URL + '/' + locale + '/events/' + id)}`}
                                target="_blank"
                                className="group flex items-center justify-center w-10 h-10 rounded-lg backdrop-blur-sm bg-white/10 hover:bg-[#25D366]/20 border border-white/20 hover:border-[#25D366]/50 transition-all duration-300"
                                title="Share on WhatsApp"
                            >
                                <svg className="w-5 h-5 text-white group-hover:text-[#25D366] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </NextLink>
                        </div>
                    </div>

                    {/* Event Card */}
                    <div className="backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 mb-12">
                        {/* Hero Image */}
                        <div className="relative h-100 w-full overflow-hidden group">
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
                                        {month} {day}, {year}
                                    </p>
                                    <p className="text-white/80 text-sm">
                                        {time} (UTC+3)
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
                                                    <SpeakerAvatar 
                                                        speakerId={speaker._id} 
                                                        speakerName={speaker.name[locale] || speaker.name.en}
                                                    />
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
                                    <NextLink
                                        href={event.url}
                                        target="_blank"
                                        className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold text-xl py-6 px-12 rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/20"
                                    >
                                        <span>{t("joinEvent")}</span>
                                        <svg className="w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </NextLink>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
