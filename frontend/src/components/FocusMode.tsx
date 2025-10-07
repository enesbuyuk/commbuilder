import { redirect } from "next/navigation";
import { Event } from "@/types/Event";

export default async function FocusMode() {

let focus_mode = "default";
const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/settings/focus_mode`);

if (response.ok) {
    const data = await response.json();
    focus_mode = data.value;
}
    if (focus_mode !== "event") {
        return null;
    }
const last_event = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/events?limit=1`);

if (!last_event.ok) {
    return null;
}

const event_data: Event[] = await last_event.json();
if (!event_data || event_data.length === 0) {
    return null;
}

const event = event_data[0];

redirect(`/events/${event._id}`);
}