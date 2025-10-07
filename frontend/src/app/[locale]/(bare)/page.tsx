import MediumArticles from "@/components/MediumArticles";
import LastEvents from "@/components/LastEvents";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FocusMode from "@/components/FocusMode";

const pageName = "index";

let focus_mode = "default";
const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/settings/focus_mode`);

if (response.ok) {
    const data = await response.json();
    focus_mode = data.value;
}

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
