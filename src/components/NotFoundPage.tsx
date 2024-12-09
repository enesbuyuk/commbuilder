import {useTranslations} from 'next-intl';
import PageLayout from './PageLayout';

export default function NotFoundPage() {
    const t = useTranslations('IndexPage');

    return (
        <PageLayout title={t('title')} description={"asd"}>
            <p className="max-w-[460px]">{t('description')}</p>
        </PageLayout>
    );
}