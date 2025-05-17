import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import { getMetadata } from '@/lib/metadata';
import { Team } from '@/types/Team';
import PeriodSelector from '@/components/Team.PeriodSelector';

const pageName = 'about--team';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getMetadata(locale, pageName);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const teamsRes = await fetch(`${process.env.BACKEND_URL}/teams`, { cache: 'force-cache' });
    if (!teamsRes.ok) {
        throw new Error('Failed to fetch team data');
    }
    const teams: Team[] = await teamsRes.json();

    const [metadataTranslations] = await Promise.all([
        getTranslations({ locale, namespace: `metadata.${pageName}` }),
    ]);

    return (
        <PageLayout locale={locale} title={metadataTranslations('title')} description={metadataTranslations('description')}>
            <PeriodSelector teams={teams} />
        </PageLayout>
    );

}
