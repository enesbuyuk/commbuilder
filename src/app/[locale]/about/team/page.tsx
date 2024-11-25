import Image from 'next/image'
import Link from "next/link";
export default function Page() {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Our Team</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Kulüp takımımız iki ana ekipten oluşmaktadır. İlk ekip kulübümüzün genel yönü, gelişimi ve stratejik yönetiminden sorumlu olan üyelerden oluşur. Bu üyeler kulübün hedeflerine ulaşması için uzun vadeli planlama ve koordinasyonu üstlenir. İkinci ekipte ise projelere birinci elden katkı sağlayan, pratik uygulamalarda aktif olarak görev alan ve kulübe doğrudan destek veren üyeler yer alır. Bu dinamik yapı hem kulübümüzün sağlam temellere oturmasını hem de projelerde hızlı ve etkili sonuçlar almamızı sağlar.</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <Image alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/theme/default-profile-photo.png" width={95} height={95}/>
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Arda Usta</h2>
                                <p className="text-gray-500">Yönetim Kurulu Üyesi (Kulüp Başkanı)</p>
                                <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary" href={"mailto:ardausta@ogr.iu.edu.tr"}>ardausta@ogr.iu.edu.tr</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <Image alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/theme/default-profile-photo.png" width={95} height={95}/>
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Zehra Öztürk</h2>
                                <p className="text-gray-500">Yönetim Kurulu Üyesi (Başkan Yardımcısı)</p>
                                <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary" href={"mailto:zehraozturk2023@ogr.iu.edu.tr"}>zehraozturk2023@ogr.iu.edu.tr</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <Image alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/theme/default-profile-photo.png" width={95} height={95}/>
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Furkan Yıldız</h2>
                                <p className="text-gray-500">Yönetim Kurulu Üyesi (Sayman)</p>
                                <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary" href={"mailto:yldzfurkann0@gmail.com"}>yldzfurkann0@gmail.com</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <Image alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/theme/default-profile-photo.png" width={95} height={95}/>
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Selen Günel</h2>
                                <p className="text-gray-500">Yönetim Kurulu Üyesi (Yazman)</p>
                                <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary" href={"mailto:seleng@ogr.iu.edu.tr"}>seleng@ogr.iu.edu.tr</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <Image alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/theme/default-profile-photo.png" width={95} height={95}/>
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Diyar Kamalı</h2>
                                <p className="text-gray-500">Yönetim Kurulu Üyesi</p>
                                <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary" href={"mailto:kamalidiyar66@gmail.com"}>kamalidiyar66@gmail.com</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <Image alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/theme/default-profile-photo.png" width={95} height={95}/>
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Ramazan Özgür Altuğ</h2>
                                <p className="text-gray-500">Denetleme Kurulu (Başkan)</p>
                                <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary" href={"mailto:ozgraltg@gmail.com"}>ozgraltg@gmail.com</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <Image alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/theme/default-profile-photo.png" width={95} height={95}/>
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Muhammet Enes Böyük</h2>
                                <p className="text-gray-500">Denetleme Kurulu Üyesi</p>
                                <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary" href={"mailto:contact@enesbuyuk.com"}>contact@enesbuyuk.com</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <Image alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/theme/default-profile-photo.png" width={95} height={95}/>
                                <div className="flex-grow">
                                    <h2 className="text-gray-900 title-font font-medium">Süleyman Arif Uzun</h2>
                                    <p className="text-gray-500">Denetleme Kurulu Üyesi</p>
                                    <p className={"text-gray-500"}><Link className="text-primary hover: text-secondary" href={"mailto:suzunn3@gmail.com"}>suzunn3@gmail.com</Link></p>
                                </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <Image alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="/theme/default-profile-photo.png" width={95} height={95}/>
                                <div className="flex-grow">
                                    <h2 className="text-gray-900 title-font font-medium">--</h2>
                                    <p className="text-gray-500">--</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}