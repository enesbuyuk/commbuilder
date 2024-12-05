import {useTranslations} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import Image from "next/image";
import React from "react";
import PageLayout from "@/components/PageLayout";

export async function generateMetadata() {
    const t = await getTranslations({namespace: 'EventsPage'});
    const generalT = await getTranslations({namespace: 'General'});

    return {
        title: t('title') + generalT("titleSuffix"),
        description: t('description')
    };
}

export default function Page({params}) {
    const {locale} = React.use(params)
    setRequestLocale(locale);
    const pageT = useTranslations("GalleryPage");

    return (
        <PageLayout pageT={pageT}>
            <div className="-my-8 divide-y-2 divide-gray-100">
                <div className="flex flex-wrap md:-m-2 -m-1">
                    <div className="flex flex-wrap w-1/2">
                        <div className="md:p-2 p-1 w-1/2">
                            <Image width={600} height={600} alt="gallery"
                                   className="w-full object-cover h-full object-center block"
                                   src={"/uploads/gallery/1716286964729.jpg"}/>
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <Image width={600} height={600} alt="gallery"
                                   className="w-full object-cover h-full object-center block"
                                   src={"/theme/default-image.webp"}/>
                        </div>
                        <div className="md:p-2 p-1 w-full">
                            <Image width={600} height={600} alt="gallery"
                                   className="w-full h-full object-cover object-center block"
                                   src={"/theme/default-image.webp"}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap w-1/2">
                        <div className="md:p-2 p-1 w-full">
                            <Image width={600} height={600} alt="gallery"
                                   className="w-full h-full object-cover object-center block"
                                   src={"/uploads/gallery/1732968174829.jpg"}/>
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <Image width={600} height={600} alt="gallery"
                                   className="w-full object-cover h-full object-center block"
                                   src={"/theme/default-image.webp"}/>
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <Image width={600} height={600} alt="gallery"
                                   className="w-full object-cover h-full object-center block"
                                   src={"/theme/default-image.webp"}/>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}