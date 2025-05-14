export default async function IndexPageSectionLayout({ title, isLastSection = false, indexPageSectionId, children, }: { title: string; isLastSection: boolean; indexPageSectionId: string; children: React.ReactNode; }) {
    return (
        <section className="text-gray-600 body-font" id={indexPageSectionId}>
            <div
                className={`px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32 
                    py-4 md:py-6 lg:py-8 xl:py-12 2xl:py-20 
                    flex flex-col items-center mx-auto 
                    ${isLastSection ? "!pb-32" : ""}`}
            >
                <div className="flex flex-col w-full mt-12 mb-6 text-secondaryDark px-4 md:px-0">
                    <h2 className="text-3xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-bold title-font tracking-widest">
                        {title}
                    </h2>
                </div>
                <div className="flex flex-wrap -m-12 p-6 py-8 gap-y-4 xl:gap-y-6 2xl:gap-y-8">
                    {children}
                </div>
            </div>
        </section>
    )
}
