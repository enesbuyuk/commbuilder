import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Announcements"+ " | Istanbul University CSC",
    description: "Stay up-to-date with the latest news and announcements from the Istanbul University Computer Science Club."
};
export default async function Page() {
    return (
        <main>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="-my-8 divide-y-2 divide-gray-100">
                        <div className="py-8 flex flex-wrap md:flex-nowrap">
                            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                <span className="font-semibold title-font text-gray-700">EVENTS</span>
                                <span className="mt-1 text-gray-500 text-sm">25 Novemver 2024</span>
                            </div>
                            <div className="md:flex-grow">
                                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">VODAFONE</h2>
                                <p className="leading-relaxed">VODAFONE</p>
                                <a className="text-indigo-500 inline-flex items-center mt-4">Learn More
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor"
                                         strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="py-8 flex flex-wrap md:flex-nowrap">
                            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                <span className="font-semibold title-font text-gray-700">MEDIUM ARTICLE</span>
                                <span className="mt-1 text-gray-500 text-sm">25 Novemver 2024</span>
                            </div>
                            <div className="md:flex-grow">
                                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">Meditation bushwick
                                    direct trade taxidermy shaman</h2>
                                <p className="leading-relaxed">new medium </p>
                                <a className="text-indigo-500 inline-flex items-center mt-4">Learn More
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor"
                                         strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}