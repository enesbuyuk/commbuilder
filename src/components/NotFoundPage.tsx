import PageLayout from './PageLayout';
import {getTranslations} from "next-intl/server";

export default async function NotFoundPage() {
    const translations = {
        pageTranslations: await getTranslations("NotFoundPage")
    }

    return (
        <PageLayout title={translations.pageTranslations('title')} description={translations.pageTranslations("description")}>
            <p className="max-w-[460px]">{translations.pageTranslations('description')}</p>
        </PageLayout>
    );
}