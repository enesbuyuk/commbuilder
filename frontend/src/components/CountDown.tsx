import { getLocale } from "next-intl/server";
import CountDownClient from "./CountDownClient";
import { Event } from "@/types/Event";

type Props = {
  locale: string;
};

export default async function CountDown() {
  const locale = await getLocale();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/events?limit=1`, { cache: "no-store" });
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
