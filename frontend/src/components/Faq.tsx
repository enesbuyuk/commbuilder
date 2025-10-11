'use client';
import React, {useEffect, useState} from "react";

interface FAQ {
    _id: string;
    question: {
        [key: string]: string;
    };
    answer: {
        [key: string]: string;
    };
}

export default function Faq({locale}: {locale: string}) {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SITE_URL}/api/external/faq`,
                    { cache: "no-store" }
                );
                if (!res.ok) throw new Error("Failed to fetch FAQs");
                const data = await res.json();
                setFaqs(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching FAQs:", err);
                setError("An error occurred while loading FAQs.");
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, []);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    if (faqs.length === 0) {
        return <div className="text-center p-4">No FAQs available yet.</div>;
    }

    return (
        <>
            {faqs.map((faq, index) => {
                const question = faq.question?.[locale] || faq.question?.en || '';
                const answer = faq.answer?.[locale] || faq.answer?.en || '';
                
                return (
                    <div key={faq._id} className="bg-white rounded-sm shadow-md w-full">
                        <div
                            className="cursor-pointer p-4 flex justify-between items-center"
                            onClick={() => toggleFAQ(index)}
                        >
                            <h2 className="text-lg font-medium text-gray-900">{question}</h2>
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
                                <p className="text-gray-700">{answer}</p>
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    )
}