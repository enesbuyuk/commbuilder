import {getTranslations, setRequestLocale} from "next-intl/server";
import {Announcement} from "@/types/Announcement";
import Link from "next/link";

export default async function AdminAnnouncementsList({params}: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    setRequestLocale(locale);
    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("AdminPage")
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/announcements`, {
        cache: 'force-cache'
    });

    const announcements: Announcement[] = await response.json();

    return (
        <div className="justify-items-center display-block">
            <h1
                className="text-center text-primary uppercase tracking-widest font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl pb-2 sm:pb-4 md:pb-6 lg:pb-8"
            >{translations.pageTranslations("announcements")}</h1>
                {announcements.map((announcement) => (
                <div
                    key={announcement._id}
                    className="w-2/3 bg-white shadow-sm rounded-lg p-2 border border-gray-300 hover:shadow-md transition flex justify-between items-center"
                >
                    <div>
                        <Link
                            href={process.env.NEXT_PUBLIC_SITE_URL + "/" + locale + "/admin/announcements/" + announcement._id + "/edit"}
                            className="text-blue-500 font-medium text-md hover:underline"
                        >
                            {announcement.announcement_title[locale]}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                            {announcement.announcement_description[locale]}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );

}
