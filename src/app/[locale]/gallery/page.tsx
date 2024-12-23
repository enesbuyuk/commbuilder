import {getTranslations, setRequestLocale} from "next-intl/server";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";

export async function generateMetadata() {
    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("GalleryPage")
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
        pageTranslations: await getTranslations("GalleryPage")
    }

    return (
        <PageLayout locale={locale} title={translations.pageTranslations("title")} description={translations.pageTranslations("description")}>
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