import AdminSignIn from "@/components/admin/AdminSignIn";
import {getTranslations} from "next-intl/server";

export async function generateMetadata() {
    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("AdminPage"),
    };

    return {
        title: translations.pageTranslations("title") + translations.generalTranslations("titleSuffix"),
    }
}
export default function AdminSignInPage() {
    return <AdminSignIn/>
}
