import {getTranslations, setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";

export async function generateMetadata() {
    const t = await getTranslations({ namespace: 'joinTheClubPage'});
    const generalT = await getTranslations({ namespace: 'General'});

    return {
        title: t('title') + generalT("titleSuffix"),
        description: t('description')
    };
}

export default function Page({params}) {
    const { locale } = Promise.resolve(params)
    setRequestLocale(locale);
    const pageT = useTranslations("JoinTheClubPage");
    return (
        <section>
            {pageT("title")}
        </section>
    )
}