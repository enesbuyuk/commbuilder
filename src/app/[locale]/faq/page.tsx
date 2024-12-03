import {useTranslations} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import Faq from "@/components/Faq";
import React from "react";

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
        <main>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="flex flex-col text-center w-full mb-20 bg-secondaryDark p-12 pt-20 text-white">
                    <h1 className="text-3xl font-bold title-font mb-4 text-white tracking-widest">{pageT("title")}</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{pageT("description")}</p>
                </div>
                <Faq locale={locale}/>
            </section>
        </main>
    )
}