import React from "react";
import {useTranslations} from "next-intl";
import {getPath} from "@/i18n/routing";
import Link from "next/link";
import {User} from "@/types/User";

export default function AdminHome({locale,user}:{locale:string,user:User}){
    const translations = {
        pageTranslations: useTranslations("AdminPage")
    }
    return(
        <main className="flex-1 p-6 bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4">{translations.pageTranslations("welcome")}, <span className={"font-bold"}>{user.username}</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 border border-gray-300 shadow-md rounded-lg">
                    <h3 className="text-xl font-medium mb-4">{translations.pageTranslations("announcements")}</h3>
                    <p>{translations.pageTranslations("announcementsDesc")}</p>
                    <div className={"flex items-center justify-center my-5"}>
                        <Link
                            className="w-2/3 self-center rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-white gap-2 hover:bg-secondaryDark text-xs sm:text-sm md:text-base h-10 sm:h-12 px-4 sm:px-6 md:px-8 duration-300"
                            href={process.env.NEXT_PUBLIC_SITE_URL + "/" + locale + getPath('/admin/announcements', locale)}
                        >{translations.pageTranslations("goToLink")}</Link>
                    </div>
                </div>
                <div className="bg-white p-6 border border-gray-300 shadow-md rounded-lg">
                    <h3 className="text-xl font-medium mb-4">{translations.pageTranslations("events")}</h3>
                    <p>{translations.pageTranslations("eventsDesc")}</p>
                    <div className={"flex items-center justify-center my-5"}>
                        <Link
                            className="w-2/3 self-center rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-white gap-2 hover:bg-secondaryDark text-xs sm:text-sm md:text-base h-10 sm:h-12 px-4 sm:px-6 md:px-8 duration-300"
                            href={process.env.NEXT_PUBLIC_SITE_URL + "/" + locale + getPath('/admin/events', locale)}
                        >{translations.pageTranslations("goToLink")}</Link>
                    </div>
                </div>
                <div className="bg-white p-6 border border-gray-300 shadow-md rounded-lg">
                    <h3 className="text-xl font-medium mb-4">{translations.pageTranslations("socialMediaManagement")}</h3>
                    <p>{translations.pageTranslations("socialMediaManagementDesc")}</p>
                    <div className={"flex items-center justify-center my-5"}>
                        <Link
                            className="w-2/3 self-center rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-white gap-2 hover:bg-secondaryDark text-xs sm:text-sm md:text-base h-10 sm:h-12 px-4 sm:px-6 md:px-8 duration-300"
                            href={process.env.NEXT_PUBLIC_SITE_URL + "/" + locale + getPath('/admin/social-media-management', locale)}
                        >{translations.pageTranslations("goToLink")}</Link>
                    </div>
                </div>
                <div className="bg-white p-6 border border-gray-300 shadow-md rounded-lg">
                    <h3 className="text-xl font-medium mb-4">{translations.pageTranslations("userManagement")}</h3>
                    <p>{translations.pageTranslations("userManagementDesc")}</p>
                    <div className={"flex items-center justify-center my-5"}>
                        <Link
                            className="w-2/3 self-center rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-white gap-2 hover:bg-secondaryDark text-xs sm:text-sm md:text-base h-10 sm:h-12 px-4 sm:px-6 md:px-8 duration-300"
                            href={process.env.NEXT_PUBLIC_SITE_URL + "/" + locale + getPath('/admin/user-management', locale)}
                        >{translations.pageTranslations("goToLink")}</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
