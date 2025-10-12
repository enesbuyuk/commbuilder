import MediumArticles from "@/components/MediumArticles";
import LastEvents from "@/components/LastEvents";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FocusMode from "@/components/FocusMode";

const pageName = "index";

export default async function Page() {
    return (
        <>
            <Header isHome={true} />
            <main className="flex flex-col items-center justify-center w-full overflow-hidden">
                <FocusMode/>
                <LastEvents pageName={pageName} />
                <MediumArticles pageName={pageName} />
            </main>
            <Footer />
        </>
    )
}
