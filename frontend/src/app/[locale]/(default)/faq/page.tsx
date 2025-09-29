import {getTranslations, getLocale} from "next-intl/server";
import Faq from "@/components/Faq";
import PageLayout from "@/components/PageLayout";
import {getMetadata} from "@/lib/metadata";

const pageName = "faq";

export async function generateMetadata() {
    return getMetadata(pageName);
}

export default async function Page() {
    const [metadataTranslations] = await Promise.all([
        getTranslations(`metadata.${pageName}`),
    ]);

    const locale = await getLocale()

    return (
        <PageLayout title={metadataTranslations("title")} description={metadataTranslations("description")} spaceY={"6"}>
            <Faq locale={locale}/>
        </PageLayout>
    )
}
