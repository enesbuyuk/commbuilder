import {getLocale, getTranslations} from "next-intl/server";
import IndexPageSectionLayout from "@/components/IndexPageSectionLayout";
import {Event} from "@/types/Event";
import EventCard from "@/components/EventCard";

export default async function LastEvents({pageName}: {pageName: string}) {
    const contentTranslations = await getTranslations(`pages.${pageName}`)

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/events?limit=3`);
    const json = await response.json();
    const lastEvents: Event[] = Array.isArray(json) ? json : json.data || [];

    return (
        <IndexPageSectionLayout title={contentTranslations("lastEvents")} indexPageSectionId={"last-events"} isLastSection={false}>
            {lastEvents.map((event:Event) => (
                <div key={event._id} className="lg:w-1/3 md:w-1/2 w-full py-8 px-12 md:px-4">
                    <EventCard 
                        event={event}
                    />
                </div>
            ))}
        </IndexPageSectionLayout>
    )
}
