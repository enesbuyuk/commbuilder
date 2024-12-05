export default async function PageLayout({children, pageT, bg, spaceY}) {
    {/* for only text pages*/}
    if (bg === "white") {
        bg = " bg-white"
    } else {
        bg = ""
    }
    if (spaceY == undefined) {
        spaceY = " space-y-12"
    } else {
        spaceY = " space-y-" + spaceY
    }

    return (
        <main>
            <section className={"text-gray-600 body-font overflow-hidden" + bg}>
                <div className="flex flex-col text-center w-full bg-primary p-12 pt-20 text-white">
                    <h1 className="text-3xl font-bold title-font mb-4 text-white tracking-widest">{pageT("title")}</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{pageT("description")}</p>
                </div>
                <div className={"container px-24 py-36 items-center mx-auto flex flex-col" + spaceY}>
                    {children}
                </div>
            </section>
        </main>
    )
}