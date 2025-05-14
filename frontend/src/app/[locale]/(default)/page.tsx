import {setRequestLocale} from "next-intl/server";
import MediumArticles from "@/components/MediumArticles";
import LastEvents from "@/components/LastEvents";
import React from "react";

const pageName = "index";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    setRequestLocale(locale);

    return (
            <main className="flex flex-col items-center justify-center w-full overflow-hidden">
                <MediumArticles locale={locale} pageName={pageName}/>
                <LastEvents locale={locale} pageName={pageName}/>
            </main>
    )
}
