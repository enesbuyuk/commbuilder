import {getTranslations} from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import {getMetadata} from "@/lib/metadata";

const pageName = "join-the-club";

export async function generateMetadata() {
    return getMetadata(pageName);
}

export default async function Page() {
    const [metadataTranslations, contentTranslations] = await Promise.all([
        getTranslations(`metadata.${pageName}`),
        getTranslations(`pages.${pageName}`)
    ]);

    const formFields = [
        {
            id: 'membership-form',
            labelKey: 'membershipForm'
        },
        {
            id: 'student-certificate',
            labelKey: 'studentCertificate'
        },
        {
            id: 'discipline-report',
            labelKey: 'disciplineReport'
        }
    ];

    return (
        <PageLayout title={metadataTranslations("title")}
                    description={metadataTranslations("description")}>
            <div className="max-w-4xl mx-auto p-4 space-y-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 lg:p-8">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                            {contentTranslations("joiningText.title")}
                        </h2>
                        <div className="space-y-4 text-gray-600">
                            <p className="leading-relaxed">{contentTranslations("joiningText.description1")}</p>
                            <p className="leading-relaxed">{contentTranslations("joiningText.description2")}</p>

                        </div>
                        <div className="mt-6">
                            <a
                                target="_blank"
                                href="https://chat.whatsapp.com/FgyXuaO2iJrLwtnSXpKUfe"
                                className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                            >{contentTranslations("joiningText.buttonText")}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6 lg:p-8">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">{contentTranslations("joiningText.formTitle")}</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">{contentTranslations("joiningText.formDescription")}</p>

                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        {contentTranslations("form.nameSurname")}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Linus Torvalds"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        {contentTranslations("form.email")}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="mail@mail.com"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                {formFields.map((field) => (
                                    <div key={field.id} className="space-y-2">
                                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                                            {contentTranslations(`form.${field.labelKey}`)}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id={field.id}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="agreement"
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded-sm focus:ring-indigo-500"
                                />
                                <label htmlFor="agreement" className="text-sm text-gray-700">
                                    {contentTranslations("agreement")}
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-secondaryDark text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:bg-secondary transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {contentTranslations("send")}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
