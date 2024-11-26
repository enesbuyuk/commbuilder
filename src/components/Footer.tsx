import Link from "next/link";

export default function Footer() {
    return (
        <footer className="body-font bg-primary text-white mt-24">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">

                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px"
                         fill="#fff">
                        <path
                            d="m325.2-77.02-62.9-25.87 57.13-137.59q-108.8-26.39-177.1-114.13-68.31-87.74-68.31-199.98v-174.08q0-65.92 46.54-111.73 46.54-45.82 112.24-45.82 17.33 0 33.31 3.72 15.99 3.72 31.93 10.8L544-769.67 390.35-712.8v71.45l463.04 296.61 40.24 197.89h-85.74l-41.11-84H556.54v156.83h-68.13v-156.83h-99.08L325.2-77.02Zm72.56-221.72h401.28l-100.52-64H397.36q-70.64 0-122.39-47.31-51.75-47.32-51.75-117.47h68.13q0 41.82 31.26 69.23 31.26 27.42 75.15 27.42H592.8L322.46-604.04v-124.63q0-36.89-26.37-63.15-26.36-26.27-63.73-26.27-37.36 0-63.9 25.93-26.55 25.92-26.55 63.49v174.32q0 106.59 74.7 181.1 74.69 74.51 181.15 74.51ZM232.98-698.2q-12.82 0-21.5-8.67-8.68-8.68-8.68-21.5 0-12.83 8.68-20.83 8.68-8 21.5-8t20.82 8q8 8 8 20.83 0 12.82-8 21.5-8 8.67-20.82 8.67Zm164.78 335.46Z"/>
                    </svg>
                    <span className="ml-3 text-xl text-white tracking-widest">IUCS.NET</span>
                </a>
                <p className="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">©
                    2024 IU CS CLUB —
                    <Link href="https://enesbuyuk.com" className="text-white hover:font-semibold ml-1 duration-300"
                          target="_blank">EnesBuyuk.com</Link>
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <Link className="ml-3 text-secondary hover:text-white duration-300 align-middle" href={"https://x.com/iu_bbk"}>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
     viewBox="0 0 16 16"> <path
    d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg></Link>

                    <Link className="ml-3 text-secondary hover:text-white duration-300 align-middle" href={"https://instagram.com/iu_bbk"}>
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
             className="w-5 h-5" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
        </svg>
      </Link>
    </span>
            </div>
        </footer>

    )
}