import PageLayout from '@/components/PageLayout';
import {getLocale, getTranslations} from "next-intl/server";

const pageName = "not-found";

export default async function notFound() {
    const locale = await getLocale();
    // setRequestLocale(locale);

    const metadataTranslations = await getTranslations({locale, namespace:`metadata.${pageName}`});

    return (
        <PageLayout title={metadataTranslations('title')} description={metadataTranslations("description")}>
            <p className="max-w-[900px]">{metadataTranslations('description')}</p>
        </PageLayout>
    );
}
