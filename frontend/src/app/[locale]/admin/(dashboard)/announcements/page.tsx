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

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/announcements`);

    const announcements: Announcement[] = await response.json();

    return (
        <div className="justify-items-center display-block">
            <h1
                className="text-center text-primary uppercase tracking-widest font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl pb-2 sm:pb-4 md:pb-6 lg:pb-8"
            >{translations.pageTranslations("announcements")}</h1>
            {announcements.map((announcement) => (
                <div
                    key={announcement._id}
                    className="w-2/3 mb-3 bg-white shadow-sm rounded-lg p-2 border border-gray-300 hover:shadow-md transition flex justify-between items-center"
                >
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center">
                            <Link
                                href={`/${locale}/admin/announcements/${announcement._id}/edit`}
                                className="text-blue-500 font-medium text-md hover:underline"
                            >
                                {announcement.announcement_title[locale]}
                            </Link>
                            <div className="flex items-center gap-2">
                                <Link href={`/${locale}/admin/announcements/${announcement._id}/edit`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1a1a1a">
                                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                                    </svg>
                                </Link>
                                <Link href={`/${locale}/admin/announcements/${announcement._id}/remove`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1a1a1a">
                                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            {announcement.announcement_description[locale]}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );

}
