import PageLayout from '@/components/PageLayout';
import {getTranslations, setRequestLocale} from "next-intl/server";

export default async function notFound({ params }: { params: Promise<{ locale: string }> }) {
    // why is this not working?
    // const {locale} = await params;
    // setRequestLocale(locale);

    const translations = {
        pageTranslations: await getTranslations("NotFoundPage")
    }

    return (
        <PageLayout locale={"en"} title={translations.pageTranslations('title')} description={translations.pageTranslations("description")}>
            <p className="max-w-[460px]">{translations.pageTranslations('description')}</p>
        </PageLayout>
    );
}