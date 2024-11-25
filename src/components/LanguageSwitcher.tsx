'use client';
import { useState, useEffect } from "react";

const LanguageSwitcher = () => {
    const [locale, setLocale] = useState("en");

    useEffect(() => {
        const currentPath = window.location.pathname;
        setLocale(currentPath.startsWith("/tr") ? "tr" : "en");
    }, []);

    const toggleLanguage = () => {
        const newLocale = locale === "tr" ? "en" : "tr";
        const newPath = window.location.pathname.replace(`/${locale}`, `/${newLocale}`);
        window.location.href = newPath;
    };

    return (
        <button
            onClick={toggleLanguage}
            className="inline-flex bg-secondaryDark rounded-lg text-medium text-white font-medium mr-5 px-2"
        >
      <span
          className={`py-1  ${
              locale === "tr" ? "text-white font-bold" : "text-secondary"
          }`}
      >TR
      </span>
            <span className="text-white mx-1 py-1">/</span>
            <span
                className={`py-1  ${
                    locale === "en" ? "text-white font-bold" : "text-secondary"
                }`}
            >EN
      </span>
        </button>
    );
};

export default LanguageSwitcher;