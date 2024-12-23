import {getTranslations, setRequestLocale} from "next-intl/server";
import MediumArticles from "@/components/MediumArticles";
import LastEvents from "@/components/LastEvents";
import Header from "@/components/Header";
import React from "react";

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    setRequestLocale(locale);

    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("IndexPage")
    }
    return (
        <>
            <Header locale={locale} indexHero={true}/>
            <main className="flex flex-col items-center justify-center w-full overflow-hidden">
                <MediumArticles/>
                <LastEvents locale={locale}/>
            </main>
        </>
    )
}
