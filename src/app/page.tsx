export default function Home() {
    return (
        <main className={"flex flex-col items-center justify-center p-24 h-full"}>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <h1 className={"text-center text-primary uppercase tracking-widest font-extrabold py-8 text-5xl"}>ISTANBUL
                        UNIVERSITY<br/>COMPUTER SCIENCE CLUB</h1>
                    <h2 className={"text-3xl text-black text-center mt-20"}>Welcome to Istanbul University Faculty of
                        Science, Computer Science Club!</h2>
                    <div className="flex gap-4 items-center flex-col sm:flex-row justify-center">
                        <a
                            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-background gap-2 hover:bg-secondaryDark text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 mt-10 duration-300"
                            href="/join-the-club"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                 fill="#fff">
                                <path
                                    d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z"/>
                            </svg>
                            Join The Club
                        </a>
                    </div>
                </div>
                <video
                    src={"/theme/videoplayback.webm"}
                    autoPlay
                    muted
                    loop
                    className={"absolute inset-0 -z-10 h-full w-full object-cover"}
                />
            </section>
        </main>
    )
}
