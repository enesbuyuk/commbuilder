"use client";

import { useTranslations } from "next-intl";
import { Typewriter } from "react-simple-typewriter";

export default function HomeTypewriter() {
    const t = useTranslations("pages.index.slogans");

    return (
        <Typewriter
            words={[t("slogan1"), t("slogan2"), t("slogan3")]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
        />
    );
}
