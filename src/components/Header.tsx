import Navbar from "@/components/Navbar";

export default async function Header({locale}: {locale: string}) {
    return (
        <header className="text-gray-600 body-font">
            <Navbar locale={locale}/>
        </header>
    );
}