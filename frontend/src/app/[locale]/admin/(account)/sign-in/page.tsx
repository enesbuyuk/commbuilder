import AdminSignIn from "@/components/admin/AdminSignIn";
import {getLocale, getTranslations} from "next-intl/server";

export async function generateMetadata() {
    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("AdminPage"),
    };

    return {
        title: translations.pageTranslations("title") + translations.generalTranslations("titleSuffix"),
    }
}
export default async function AdminSignInPage() {
    const locale = await getLocale();
    return (
        <AdminSignIn locale={locale}/>
    )
}
