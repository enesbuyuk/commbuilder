import React from 'react';
import Header from "@/components/Header";

interface PageLayoutProps {
    locale: string; // will be used to set the locale for the page
    title: string;
    description: string;
    bg?: string;
    spaceY?: string;
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({locale='en', title,description,bg = '',spaceY = '', children}) => {
    if (bg === "white") {
        bg = " bg-white"
    } else {
        bg = ""
    }
    if (spaceY == "") {
        spaceY = " space-y-12"
    } else {
        spaceY = " space-y-" + spaceY
    }

    return (
        <>
            <Header locale={locale} indexHero={false}/>
            <main>
                <section className={`text-gray-600 body-font overflow-hidden ${bg}`}>
                    <div className="flex flex-col text-center w-full bg-primary
          p-4 sm:p-6 md:p-8 lg:p-12
          text-white"
                    >
                        <h1 className="
            text-2xl sm:text-3xl md:text-3xl lg:text-3xl
            font-bold title-font
            mb-2 sm:mb-3 md:mb-4
            text-white
            tracking-widest"
                        >
                            {title}
                        </h1>
                        <p className="
            w-full
            sm:w-11/12
            md:w-2/3
            lg:w-2/3
            mx-auto
            leading-relaxed
            text-sm sm:text-base
            px-4 sm:px-0"
                        >
                            {description}
                        </p>
                    </div>

                    <div className={`
          container 
          px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12
          py-8 sm:py-12 md:py-24 lg:py-24 
          items-center 
          mx-auto 
          flex flex-col min-h-screen
          ${spaceY}`}
                    >
                        {children}
                    </div>
                </section>
            </main>
        </>

    );
};

export default PageLayout;
