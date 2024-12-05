import {useTranslations} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import Faq from "@/components/Faq";
import React from "react";
import PageLayout from "@/components/PageLayout";

export async function generateMetadata() {
    const t = await getTranslations({namespace: 'FaqPage'});
    const generalT = await getTranslations({namespace: 'General'});

    return {
        title: t('title') + generalT("titleSuffix"),
        description: t('description')
    };
}

export default function Page({params}) {
    const {locale} = React.use(params)
    setRequestLocale(locale);
    const pageT = useTranslations("FaqPage");

    return (
        <PageLayout pageT={pageT} spaceY={"6"}>
            <Faq locale={locale}/>
        </PageLayout>
    )
}