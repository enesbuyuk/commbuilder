import Image from 'next/image'
import Link from "next/link";
import {getTranslations, setRequestLocale} from "next-intl/server";
import PageLayout from "@/components/PageLayout";

export async function generateMetadata() {
    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("TeamPage")
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
        pageTranslations: await getTranslations("TeamPage")
    }
    return (
        <PageLayout title={translations.pageTranslations("title")} description={translations.pageTranslations("description")}>
            <div className="flex flex-wrap -m-2">
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                    <div className="bg-white h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <Image alt="team"
                               className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                               src="/theme/default-profile-photo.png" width={95} height={95}/>
                        <div className="flex-grow">
                            <h2 className="text-gray-900 title-font font-medium">Arda Usta</h2>
                            <p className="text-gray-500">Yönetim Kurulu Üyesi (Kulüp Başkanı)</p>
                            <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary"
                                                                 href={"mailto:ardausta@ogr.iu.edu.tr"}>ardausta@ogr.iu.edu.tr</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                    <div className="bg-white h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <Image alt="team"
                               className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                               src="/theme/default-profile-photo.png" width={95} height={95}/>
                        <div className="flex-grow">
                            <h2 className="text-gray-900 title-font font-medium">Zehra Öztürk</h2>
                            <p className="text-gray-500">Yönetim Kurulu Üyesi (Başkan Yardımcısı)</p>
                            <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary"
                                                                 href={"mailto:zehraozturk2023@ogr.iu.edu.tr"}>zehraozturk2023@ogr.iu.edu.tr</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                    <div className="bg-white h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <Image alt="team"
                               className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                               src="/theme/default-profile-photo.png" width={95} height={95}/>
                        <div className="flex-grow">
                            <h2 className="text-gray-900 title-font font-medium">Furkan Yıldız</h2>
                            <p className="text-gray-500">Yönetim Kurulu Üyesi (Sayman)</p>
                            <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary"
                                                                 href={"mailto:yldzfurkann0@gmail.com"}>yldzfurkann0@gmail.com</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                    <div className="bg-white h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <Image alt="team"
                               className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                               src="/theme/default-profile-photo.png" width={95} height={95}/>
                        <div className="flex-grow">
                            <h2 className="text-gray-900 title-font font-medium">Selen Günel</h2>
                            <p className="text-gray-500">Yönetim Kurulu Üyesi (Yazman)</p>
                            <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary"
                                                                 href={"mailto:seleng@ogr.iu.edu.tr"}>seleng@ogr.iu.edu.tr</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                    <div className="bg-white h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <Image alt="team"
                               className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                               src="/theme/default-profile-photo.png" width={95} height={95}/>
                        <div className="flex-grow">
                            <h2 className="text-gray-900 title-font font-medium">Diyar Kamalı</h2>
                            <p className="text-gray-500">Yönetim Kurulu Üyesi</p>
                            <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary"
                                                                 href={"mailto:kamalidiyar66@gmail.com"}>kamalidiyar66@gmail.com</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                    <div className="bg-white h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <Image alt="team"
                               className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                               src="/theme/default-profile-photo.png" width={95} height={95}/>
                        <div className="flex-grow">
                            <h2 className="text-gray-900 title-font font-medium">Ramazan Özgür Altuğ</h2>
                            <p className="text-gray-500">Denetleme Kurulu (Başkan)</p>
                            <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary"
                                                                 href={"mailto:ozgraltg@gmail.com"}>ozgraltg@gmail.com</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                    <div className="bg-white h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <Image alt="team"
                               className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                               src="/theme/default-profile-photo.png" width={95} height={95}/>
                        <div className="flex-grow">
                            <h2 className="text-gray-900 title-font font-medium">Muhammet Enes Böyük</h2>
                            <p className="text-gray-500">Denetleme Kurulu Üyesi</p>
                            <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary"
                                                                 href={"mailto:contact@enesbuyuk.com"}>contact@enesbuyuk.com</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                    <div className="bg-white h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <Image alt="team"
                               className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                               src="/theme/default-profile-photo.png" width={95} height={95}/>
                        <div className="flex-grow">
                            <h2 className="text-gray-900 title-font font-medium">Süleyman Arif Uzun</h2>
                            <p className="text-gray-500">Denetleme Kurulu Üyesi</p>
                            <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary"
                                                                 href={"mailto:suzunn3@gmail.com"}>suzunn3@gmail.com</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                    <div className="bg-white h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <Image alt="team"
                               className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                               src="/theme/default-profile-photo.png" width={95} height={95}/>
                        <div className="flex-grow">
                            <h2 className="text-gray-900 title-font font-medium">--</h2>
                            <p className="text-gray-500">--</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}