import {getTranslations, setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import PageLayout from "@/components/PageLayout";
import React from "react";

export async function generateMetadata() {
    const t = await getTranslations({namespace: 'JoinTheClubPage'});
    const generalT = await getTranslations({namespace: 'General'});

    return {
        title: t('title') + generalT("titleSuffix"),
        description: t('description')
    };
}

export default function Page({params}) {
    const {locale} = React.use(params)
    setRequestLocale(locale);
    const pageT = useTranslations("JoinTheClubPage");

    return (
        <PageLayout pageT={pageT}>
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">WhatsApp Grubumuz</h2>
                <p className="text-gray-600 mb-4">
                    Kulübümüze katılmak için izlemeniz gereken birkaç kolay adım bulunmaktadır. İlk olarak kulübümüzün etkinliklerinden haberdar olabilmeniz ve diğer üyelerle iletişimde kalabilmeniz için WhatsApp grubumuza katılabilirsiniz. Bu grup kulüp içindeki etkileşimi artırarak sizlere daha hızlı ve etkin bir iletişim ağı sunacaktır.</p>
                <p className="text-gray-600 mb-4">
                    Ardından, resmî olarak kulüp üyesi olabilmeniz için gerekli belgelerinizi yüklemeniz gerekmektedir. Belgelerinizi yüklediğinizde, kaydınız tamamlanmış olacak ve kulübümüzün sağladığı tüm hak ve olanaklardan faydalanmaya başlayabileceksiniz. Herhangi bir sorunuz olduğunda veya yardıma ihtiyaç duyduğunuzda bizimle iletişime geçmekten çekinmeyin.
                </p>
                <a href="https://chat.whatsapp.com/FgyXuaO2iJrLwtnSXpKUfe"
                   className="inline-block bg-green-500 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-green-600 transition">
                    WhatsApp Grubuna Katıl
                </a>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Kulübe Resmî Üye Kaydı</h2>
                <p className="text-gray-600 mb-4">
                    İstanbul Üniversitesinin resmî kulüp üyeliği için yapılması gereken birkaç adım vardır. İÜ Kulüp Üyelik Formu’nun doldurulması, İÜ AKSİS üzerinden alınan öğrenci belgesi ve İÜ AKSİS üzerinden alınan disiplin belgeniz. Bu belgeleri aşağıdaki alanlara yüklemeniz yeterlidir.
                </p>
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ad & Soyad</label>
                        <input type="text" id="name" name="name" placeholder="Örn. Enes Büyük"
                               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta
                            Adresi</label>
                        <input type="email" id="email" name="email" placeholder="Örn. mail@adresiniz.com"
                               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
                    </div>

                    <div>
                        <label htmlFor="membership-form" className="block text-sm font-medium text-gray-700">İstanbul
                            Üniversitesi Kulüp Üyelik Formu</label>
                        <input type="file" id="membership-form" name="membership-form"
                               className="mt-1 block w-full text-gray-700 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
                    </div>

                    <div>
                        <label htmlFor="student-certificate" className="block text-sm font-medium text-gray-700">İstanbul
                            Üniversitesi Öğrenci Belgesi</label>
                        <input type="file" id="student-certificate" name="student-certificate"
                               className="mt-1 block w-full text-gray-700 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
                    </div>

                    <div>
                        <label htmlFor="discipline-report" className="block text-sm font-medium text-gray-700">İstanbul
                            Üniversitesi Disiplin Belgesi</label>
                        <input type="file" id="discipline-report" name="discipline-report"
                               className="mt-1 block w-full text-gray-700 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
                    </div>

                    <div className="flex items-center">
                        <input type="checkbox" id="agreement" name="agreement"
                               className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                        <label htmlFor="agreement" className="ml-2 block text-sm text-gray-700">
                            Kullanım sözleşmesini ve veri işleme onayını kabul ediyorum.
                        </label>
                    </div>

                    <button type="submit"
                            className="w-full bg-primary text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-indigo-700 transition">
                        {pageT("send")}
                    </button>
                </form>
            </div>
        </PageLayout>
    )
}