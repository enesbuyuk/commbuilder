import { getLocale } from "next-intl/server";
import CountDownClient from "./CountDownClient";
import { Event } from "@/types/Event";

export default async function CountDown({eventId=""}: {eventId: string}) {
  const locale = await getLocale();

  try {
    let res;
    if (eventId) {
      res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/events/${eventId}`);
    } else {
      res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/events?limit=1`);
    }
    if (!res.ok) {
      return <div className="text-center p-10">Error fetching event data</div>;
    }

    const data: Event[] = await res.json();
    const event = Array.isArray(data) ? data[0] : data;

    if (!event) {
      return <div className="text-center p-10">No event found</div>;
    }

    return <CountDownClient event={event} locale={locale} />;
  } catch (error) {
    return <div className="text-center p-10">Error fetching event data</div>;
  }
}
