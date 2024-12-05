import {useTranslations} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import React from "react";
import Events from "@/components/Events";
import PageLayout from "@/components/PageLayout";

export async function generateMetadata() {
    const t = await getTranslations({namespace: 'EventsPage'});
    const generalT = await getTranslations({namespace: 'General'});

    return {
        title: t('title') + generalT("titleSuffix"),
        description: t('description')
    };
}

export default function Page({params}) {
    const {locale} = React.use(params)
    setRequestLocale(locale);
    const pageT = useTranslations("EventsPage");

    return (
        <PageLayout pageT={pageT}>
            <Events locale={locale} pageT={pageT}/>
        </PageLayout>
    )
}