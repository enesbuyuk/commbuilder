import {useTranslations} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import Image from "next/image";
import React from "react";
export async function generateMetadata() {
    const t = await getTranslations({ namespace: 'EventsPage'});
    const generalT = await getTranslations({ namespace: 'General'});

    return {
        title: t('title') + generalT("titleSuffix"),
        description: t('description')
    };
}

export default function Page({params}) {
    const { locale } = Promise.resolve(params)
    setRequestLocale(locale);
    const pageT = useTranslations("GalleryPage");
    return (
        <main>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="flex flex-col text-center w-full mb-20 bg-secondaryDark p-12 pt-20 text-white">
                    <h1 className="text-3xl font-bold title-font mb-4 text-white tracking-widest">{pageT("title")}</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{pageT("description")}</p>
                </div>
                <div className="container px-24 py-12 items-center mx-auto p-6 flex flex-col space-y-6">
                    <div className="-my-8 divide-y-2 divide-gray-100">
                        <div className="flex flex-wrap md:-m-2 -m-1">
                            <div className="flex flex-wrap w-1/2">
                                <div className="md:p-2 p-1 w-1/2">
                                    <Image width={600} height={600} alt="gallery" className="w-full object-cover h-full object-center block"
                                         src={"/theme/default-image.jpg"}/>
                                </div>
                                <div className="md:p-2 p-1 w-1/2">
                                    <Image width={600} height={600} alt="gallery" className="w-full object-cover h-full object-center block"
                                         src={"/theme/default-image.jpg"}/>
                                </div>
                                <div className="md:p-2 p-1 w-full">
                                    <Image width={600} height={600} alt="gallery" className="w-full h-full object-cover object-center block"
                                         src={"/theme/default-image.jpg"}/>
                                </div>
                            </div>
                            <div className="flex flex-wrap w-1/2">
                                <div className="md:p-2 p-1 w-full">
                                    <Image width={600} height={600} alt="gallery" className="w-full h-full object-cover object-center block"
                                         src={"/theme/default-image.jpg"}/>
                                </div>
                                <div className="md:p-2 p-1 w-1/2">
                                    <Image width={600} height={600} alt="gallery" className="w-full object-cover h-full object-center block"
                                         src={"/theme/default-image.jpg"}/>
                                </div>
                                <div className="md:p-2 p-1 w-1/2">
                                    <Image width={600} height={600} alt="gallery" className="w-full object-cover h-full object-center block"
                                         src={"/theme/default-image.jpg"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}