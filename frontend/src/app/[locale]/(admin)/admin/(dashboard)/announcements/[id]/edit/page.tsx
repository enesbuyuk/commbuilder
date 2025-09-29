import {getTranslations, setRequestLocale} from "next-intl/server";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string,id:string }> }) {
    const { locale } = await params;
    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("AdminPage.AnnouncementsPage")
    }

    return {
        title: translations.pageTranslations('title') + translations.generalTranslations("titleSuffix"),
        description: translations.pageTranslations('description'),
        openGraph: {
            siteName: translations.generalTranslations('title'),
            title: translations.pageTranslations('title'),
            description: translations.pageTranslations('description'),
            type: 'website'
        },
        alternates: {
            canonical: `/${locale}/edit, locale)}`,
        }
    };
}

export default async function Page({params}: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const translations = {
        pageTranslations: await getTranslations("AdminPage.AnnouncementsPage")
    }

    return (
        <>
            <div className="max-w-4xl mx-auto p-4 space-y-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 lg:p-8">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                            {translations.pageTranslations("editingText.title")}
                        </h2>
                        <div className="space-y-4 text-gray-600">
                            <p className="leading-relaxed">{translations.pageTranslations("editingText.description1")}</p>
                            <p className="leading-relaxed">{translations.pageTranslations("editingText.description2")}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6 lg:p-8">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">{translations.pageTranslations("editingText.formTitle")}</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">{translations.pageTranslations("editingText.formDescription")}</p>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    {translations.pageTranslations("form.title")}
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="Enter announcement title"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                    {translations.pageTranslations("form.content")}
                                </label>
                                <textarea
                                    id="content"
                                    rows={5}
                                    placeholder="Enter announcement content"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-secondaryDark text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:bg-secondary transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {translations.pageTranslations("save")}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
