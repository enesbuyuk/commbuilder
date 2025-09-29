import {getTranslations} from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import Gallery from "@/components/Gallery";
import {getMetadata} from "@/lib/metadata";

const pageName = "gallery";

export async function generateMetadata() {
    return getMetadata(pageName);
}

export default async function Page() {
    const [metadataTranslations] = await Promise.all([
        getTranslations(`metadata.${pageName}`),
    ]);

    return (
        <PageLayout title={metadataTranslations("title")} description={metadataTranslations("description")}>
            <Gallery/>
        </PageLayout>
    )
}
