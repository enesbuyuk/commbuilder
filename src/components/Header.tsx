import Link from "next/link";
import Image from "next/image";
import {useTranslations} from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export function Header () {
    const tPage = useTranslations("Header");
  return (
      <header className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
              <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href={"/"}
                    title={"Istanbul University Computer Science Club"}>
                  {/* eslint-disable-next-line react/jsx-no-undef */}
                  <Image src="/theme/logo.png" alt="Istanbul University Computer Science Club Logo" width={270}
                         height={45}/>
                  {/*<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round"*/}
                  {/*     strokeLinejoin="round" strokeWidth="2"*/}
                  {/*     className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">*/}
                  {/*    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>*/}
                  {/*</svg>*/}
                  {/*<span className="ml-3 text-xl">Tailblocks</span>*/}
              </Link>
              <nav
                  className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                  <Link className="mr-5 text-black hover:text-primary font-bold text-lg" href={"/"}>{tPage("index")}</Link>
                  <Link className="mr-5 text-black hover:text-primary font-bold text-lg"
                        href={"https://medium.iucs.net"}>Medium</Link>
                  <Link className="mr-5 text-black hover:text-primary font-bold text-lg"
                        href={"/announcements"}>{tPage("announcements")}</Link>
                  <Link className="mr-5 text-black hover:text-primary font-bold text-lg"
                        href={"/events"}>{tPage("events")}</Link>
                  <Link className="mr-5 text-black hover:text-primary font-bold text-lg"
                        href={"/links"}>{tPage("links")}</Link>
                  <Link className="mr-5 text-black hover:text-primary font-bold text-lg"
                        href={"/gallery"}>{tPage("gallery")}</Link>
                  <Link className="mr-5 text-black hover:text-primary font-bold text-lg"
                        href={"/about"}>{tPage("about")}</Link>
                  <Link className="mr-5 text-black hover:text-primary font-bold text-lg"
                        href={"/contact"}>{tPage("contact")}</Link>
              </nav>
              <LanguageSwitcher/>
              <Link
                  className="inline-flex items-center bg-primary hover:bg-secondary text-gray-300 hover:text-white border-0 focus:outline-none rounded text-base mt-4 md:mt-0 duration-300 px-4 py-2"
                  href={"/join-the-club"}>{tPage("joinTheClub")}
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                       className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
              </Link>
          </div>
      </header>
  )
}