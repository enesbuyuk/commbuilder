import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageLayout from '@/components/PageLayout';
import { getMetadata } from '@/lib/metadata';
import { Team } from '@/types/Team';
import PeriodSelector from '@/components/Team.PeriodSelector';

const pageName = 'about--team';

export async function generateMetadata() {
    return getMetadata(pageName);
}

export default async function Page() {
    const [metadataTranslations] = await Promise.all([
        getTranslations(`metadata.${pageName}`),
    ]);
    
    const teamsRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/teams`, { cache: 'force-cache' });
    if (!teamsRes.ok) {
        throw new Error('Failed to fetch team data');
    }
    const teams: Team[] = await teamsRes.json();


    return (
        <PageLayout title={metadataTranslations('title')} description={metadataTranslations('description')}>
            <PeriodSelector teams={teams} />
        </PageLayout>
    );

}
