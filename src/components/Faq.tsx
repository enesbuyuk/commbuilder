'use client';
import React, {useState} from "react";

export default function Faq({locale}) {
    const faqs = {
        tr: [
            {
                question: "Kulübe nasıl katılabilirim?",
                answer: "Kulübe doğrudan WhatsApp kanalı üzerinden katılabilirsiniz. Ancak İstanbul Üniversitesi bünyesinde resmi kayıtlı bir kulüp üyesi olabilmeniz için eğitim dönemi başında; disiplin belgesi, öğrenci belgesi ve kulüp kayıt formunu bize iletmeniz gerekmektedir."
            },
            {
                question: "Kulüp etkinlikleri için resmî kayıt olmam gerekir mi?",
                answer: "Hayır, etkinliklere katılmak için kulübün resmî üyesi olmanız gerekmiyor. Ancak bazı etkinlikler kontenjanla sınırlı olabiliyor. Bu tür etkinliklerde resmî üyelerimiz öncelik avantajına sahiptir."
            },
            {
                question: "Etkinliklerde katılım ücreti var mı?",
                answer: "Etkinliklerin çoğunluğu ücretsiz olup dışarıda toplu şekilde katıldığımız büyük etkinlikler için etkinlik sahibi tarafından belirli bir katılım ücreti talep edilebilir. Katılım ücretiyle ilgili bilgiler etkinlik detaylarında yer alacaktır. Ancak kulübümüzün düzenlediği kendi etkinliklerimiz her zaman ücretsizdir."
            },
            {
                question: "Kulüp etkinliklerine katılım zorunlu mu?",
                answer: "Kulüp etkinliklerine katılım zorunlu değildir, ancak etkinliklerin içeriği ve önemi hakkında kulüp üyelerine düzenli olarak bilgilendirme yapılır. Fırsatlardan faydalanmak için katılmanızı öneririz 🙂"
            },
            {
                question: "Kulüp üyeliğini yenilemem gerekiyor mu?",
                answer: "Kulüp üyeliği her eğitim dönemi yılı (Ekim-Kasım ayı) başında güncellenmelidir. Bize katıl formunu doldurarak üyeliğinizi tekrar yenileyebilirsiniz."
            }
        ],
        en: [
            {
                question: "How can I join the club?",
                answer: "You can join the club directly through the WhatsApp channel. However, to officially register as a club member within Istanbul University, you need to submit a disciplinary record, student certificate, and club registration form at the beginning of the academic term."
            },
            {
                question: "Do I need to officially register to join club events?",
                answer: "No, you don’t need to be an official club member to participate in events. However, some events may have limited spots. In such cases, official members have priority."
            },
            {
                question: "Are there participation fees for events?",
                answer: "Most events are free, but for large group events held externally, a participation fee may be requested by the event organizer. Details about fees will be provided in the event description. However, all events organized by our club are always free."
            },
            {
                question: "Is attendance mandatory for club events?",
                answer: "Attendance is not mandatory for club events. However, members are regularly informed about the content and importance of events. We recommend participating to take advantage of the opportunities 🙂"
            },
            {
                question: "Do I need to renew my club membership?",
                answer: "Club membership must be updated at the beginning of each academic year (October-November). You can renew your membership by filling out the join form."
            }
        ]
    };
    const [openIndex, setOpenIndex] = useState(null);
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container px-24 py-12 mx-auto space-y-4">
            {faqs[locale].map((faq, index) => (
                <div key={index} className="bg-white rounded shadow-md">
                    <div
                        className="cursor-pointer p-4 flex justify-between items-center"
                        onClick={() => toggleFAQ(index)}
                    >
                        <h2 className="text-lg font-medium text-gray-900">{faq.question}</h2>
                        <svg
                            className={`w-6 h-6 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M19 9l-7 7-7-7"/>
                        </svg>
                    </div>
                    {openIndex === index && (
                        <div className="p-4 border-t border-gray-200">
                            <p className="text-gray-700">{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}