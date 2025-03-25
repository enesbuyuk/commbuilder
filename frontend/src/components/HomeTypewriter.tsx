"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const Typewriter = dynamic(() => import("typewriter-effect"), {
    ssr: false,
});

export default function HomeTypewriter() {
    const t = useTranslations("pages.index.slogans");
    const [slogans, setSlogans] = useState<string[]>([]);

    useEffect(() => {
        const slogansData = [
            t("slogan1"),
            t("slogan2"),
            t("slogan3"),
        ];
        setSlogans(slogansData);
    }, [t]);

    return (
        <Typewriter
            options={{ loop: true }}
            onInit={(typewriter) => {
                slogans.forEach((text, index) => {
                    typewriter
                        .typeString(text)
                        .pauseFor(2500)
                        .deleteAll();
                    if (index === slogans.length - 1) {
                        typewriter.start();
                    }
                });
            }}
        />
    );
}
