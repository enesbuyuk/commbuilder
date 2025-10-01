import Link from "next/link";
import {getTranslations, setRequestLocale} from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import {getMetadata} from "@/lib/metadata";

const pageName = "about--charter";

export async function generateMetadata() {
    return getMetadata(pageName);
}

export default async function Page() {
    const [metadataTranslations, contentTranslations] = await Promise.all([
        getTranslations(`metadata.${pageName}`),
        getTranslations(`pages.${pageName}`)
    ]);

    return (
        <PageLayout title={metadataTranslations("title")} description={metadataTranslations("description")} bg={"white"}>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <Link
                    target="_blank"
                    className="bg-primary hover:bg-secondaryDark text-gray-300 hover:text-white text-lg font-semibold px-6 py-2 rounded-lg transition duration-300"
                    href={`${process.env.NEXT_PUBLIC_BUCKET}/uploads/iucs-tuzuk-charter.pdf`}
                >{contentTranslations("downloadTheCharter")}</Link>
            </div>
        </PageLayout>
    );
}
