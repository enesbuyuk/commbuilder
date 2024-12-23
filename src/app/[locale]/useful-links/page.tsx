import {getTranslations, setRequestLocale} from "next-intl/server";
import PageLayout from "@/components/PageLayout";


export async function generateMetadata() {
    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("UsefulLinksPage")
    }

    return {
        title: translations.pageTranslations('title') + translations.generalTranslations("titleSuffix"),
        description: translations.pageTranslations('description')
    };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    setRequestLocale(locale);

    const translations = {
        pageTranslations: await getTranslations("UsefulLinksPage")
    }

    return (
        <PageLayout locale={locale} title={translations.pageTranslations("title")} description={translations.pageTranslations("description")} bg={"white"}>
            <div
                className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                <div
                    className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-primary text-indigo-500 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px"
                         fill="#fff">
                        <path
                            d="M570-160v-60h120q21 0 35.5-14.38Q740-248.75 740-270v-100q0-37 22.5-66t57.5-40v-8q-35-10-57.5-39.5T740-590v-100q0-21.25-14.37-35.63Q711.25-740 690-740H570v-60h120q46 0 78 32.08 32 32.09 32 77.92v100q0 21.25 14.38 35.62Q828.75-540 850-540h30v120h-30q-21.25 0-35.62 14.37Q800-391.25 800-370v100q0 45.83-32.08 77.92Q735.83-160 690-160H570Zm-300 0q-46 0-78-32.08-32-32.09-32-77.92v-100q0-21.25-14.37-35.63Q131.25-420 110-420H80v-120h30q21.25 0 35.63-14.38Q160-568.75 160-590v-100q0-45.83 32.08-77.92Q224.17-800 270-800h120v60H270q-21 0-35.5 14.37Q220-711.25 220-690v100q0 37-22.5 66.5T140-484v8q35 11 57.5 40t22.5 66v100q0 21.25 14.38 35.62Q248.75-220 270-220h120v60H270Z"/>
                    </svg>
                </div>
                <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                    <h2 className="text-gray-900 text-lg title-font font-medium mb-2">CS50’s Introduction to
                        Computer Science</h2>
                    <p className="leading-relaxed text-base">CS50’s Introduction to Computer Science is a
                        challenging yet rewarding journey into coding and algorithms, wrapped in a modern,
                        quirky tech culture full of irony and creative flair.</p>
                    <a className="mt-3 text-indigo-500 inline-flex items-center"
                       href={"https://cs50.harvard.edu/x/2024/"} target="_blank">{translations.pageTranslations("goToLink")}
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                             strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </div>
            </div>
            <div
                className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                    <h2 className="text-gray-900 text-lg title-font font-medium mb-2">MITx: Introduction to
                        Computer Science and Programming Using Python</h2>
                    <p className="leading-relaxed text-base">An introduction to computer science as a tool to
                        solve real-world analytical problems using Python 3.5.</p>
                    <a className="mt-3 text-indigo-500 inline-flex items-center"
                       href={"https://www.edx.org/learn/computer-science/massachusetts-institute-of-technology-introduction-to-computer-science-and-programming-using-python"}
                       target="_blank">{translations.pageTranslations("goToLink")}
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                             strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </div>
                <div
                    className="sm:w-32 sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-primary text-indigo-500 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px"
                         fill="#fff">
                        <path
                            d="M570-160v-60h120q21 0 35.5-14.38Q740-248.75 740-270v-100q0-37 22.5-66t57.5-40v-8q-35-10-57.5-39.5T740-590v-100q0-21.25-14.37-35.63Q711.25-740 690-740H570v-60h120q46 0 78 32.08 32 32.09 32 77.92v100q0 21.25 14.38 35.62Q828.75-540 850-540h30v120h-30q-21.25 0-35.62 14.37Q800-391.25 800-370v100q0 45.83-32.08 77.92Q735.83-160 690-160H570Zm-300 0q-46 0-78-32.08-32-32.09-32-77.92v-100q0-21.25-14.37-35.63Q131.25-420 110-420H80v-120h30q21.25 0 35.63-14.38Q160-568.75 160-590v-100q0-45.83 32.08-77.92Q224.17-800 270-800h120v60H270q-21 0-35.5 14.37Q220-711.25 220-690v100q0 37-22.5 66.5T140-484v8q35 11 57.5 40t22.5 66v100q0 21.25 14.38 35.62Q248.75-220 270-220h120v60H270Z"/>
                    </svg>
                </div>
            </div>
        </PageLayout>
    )
}