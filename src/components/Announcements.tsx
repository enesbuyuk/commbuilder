import React from "react";

export default async function Announcements({generalT}) {
    const response = await fetch(`${process.env.SITE_URL}/en/api/announcements`)
    const announcements = await response.json()

    return (
        <>
            {announcements.map(announcement => {
                return (
                    <div key={announcement._id} className="bg-white px-6 py-8 rounded-lg  shadow-lg flex flex-wrap md:flex-nowrap w-full">
                        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                            <span className="font-semibold title-font text-gray-700">{ announcement.announcement_type.charAt(0).toUpperCase() + announcement.announcement_type.slice(1)}</span>
                            <span className="mt-1 text-gray-500 text-sm">25 November 2024</span>
                        </div>
                        <div className="md:flex-grow">
                            <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{announcement.announcement_title}</h2>
                            <p className="leading-relaxed">{announcement.announcement_description}</p>
                            <a className="text-indigo-500 inline-flex items-center mt-4">{generalT("learnMore")}
                                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor"
                                     strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                )
            })}
        </>
    )
}