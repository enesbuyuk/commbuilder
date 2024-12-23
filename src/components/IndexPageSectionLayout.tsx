import React from "react";

export default async function IndexPageSectionLayout({ title, indexPageSectionId, children, }: { title: string; indexPageSectionId: string; children: React.ReactNode; }) {
    return (
        <section className="text-gray-600 body-font" id={indexPageSectionId}>
            <div className="container px-4 sm:px-6 lg:px-24 py-4 md:py-6 lg:py-8 xl:py-12 flex flex-col items-center mx-auto ">
                <div className="flex flex-col w-full mt-12 mb-6 text-secondaryDark ">
                    <h2 className="text-3xl font-bold title-font tracking-widest">{title}</h2>
                </div>
                <div className="flex flex-wrap -m-12 p-6 py-8 gap-y-4">
                    {children}
                </div>
            </div>
        </section>
    )
}