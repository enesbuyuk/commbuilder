import {getTranslations, getLocale} from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import {Event} from "@/types/Event";
import {Suspense} from "react";
import {getMetadata} from "@/lib/metadata";
import EventCard from "@/components/EventCard";

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

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/events`);
    const json = await response.json();
    const events: Event[] = Array.isArray(json) ? json : json.data || [];

    return (
        <PageLayout title={metadataTranslations("title")} description={metadataTranslations("description")}>
            <div className="flex flex-wrap -mx-4 -my-8">
                <Suspense fallback={<p>Loading feed...</p>}>
                {events.map((event:Event) => (
                    <div key={event._id} className="py-8 px-4 lg:w-1/4 md:w-1/3 w-full">
                        <EventCard 
                            event={event}
                        />
                    </div>
                ))}
                </Suspense>
            </div>
        </PageLayout>
    )
}
