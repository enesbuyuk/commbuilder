import {getTranslations} from "next-intl/server";
import { redirect } from 'next/navigation';
import {getUser} from "@/utils/user";
import Link from "next/link";
import {getPath, Pathnames} from "@/i18n/routing";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    const user = await getUser();

    if (!user) {
        redirect(`/${locale}/admin/sign-in`);
    }

    const contentTranslations = await getTranslations({locale, namespace: "pages.admin"});

    return (
            <main className="flex-1 p-6 bg-gray-100">
                <h2 className="text-2xl font-semibold mb-4">{contentTranslations("welcome")}, <span className={"font-bold"}>{user.username}</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {key: "announcements", path: "/admin/announcements"},
                        {key: "events", path: "/admin/events"},
                        {key: "socialMediaManagement", path: "/admin/social-media-management"},
                        {key: "userManagement", path: "/admin/user-management"},
                    ].map(({key, path}) => (
                        <div key={key} className="bg-white p-6 border border-gray-300 shadow-md rounded-lg">
                            <h3 className="text-xl font-medium mb-4">{contentTranslations(key)}</h3>
                            <p>{contentTranslations(`${key}Desc`)}</p>
                            <div className={"flex items-center justify-center my-5"}>
                                <Link
                                    className="w-2/3 self-center rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-white gap-2 hover:bg-secondaryDark text-xs sm:text-sm md:text-base h-10 sm:h-12 px-4 sm:px-6 md:px-8 duration-300"
                                    href={`/${locale}${getPath(path as Pathnames, locale)}`}
                                >{contentTranslations("goToLink")}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        );
}
