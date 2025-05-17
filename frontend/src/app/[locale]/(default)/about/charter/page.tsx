import Link from "next/link";
import {getTranslations, setRequestLocale} from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import {getMetadata} from "@/lib/metadata";

const pageName = "about--charter";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getMetadata(locale, pageName);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    setRequestLocale(locale);

    const [metadataTranslations, contentTranslations] = await Promise.all([
        getTranslations({locale, namespace:`metadata.${pageName}`}),
        getTranslations({locale, namespace:`pages.${pageName}`})
    ]);

    return (
        <PageLayout title={metadataTranslations("title")} description={metadataTranslations("description")} bg={"white"}>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <Link
                    target="_blank"
                    className="bg-primary hover:bg-secondaryDark text-gray-300 hover:text-white text-lg font-semibold px-6 py-2 rounded-lg transition duration-300"
                    href={"/uploads/iucs-tuzuk-charter.pdf"}
                >{contentTranslations("downloadTheCharter")}</Link>
            </div>
        </PageLayout>
    );
}
