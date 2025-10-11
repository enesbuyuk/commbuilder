'use client';

import { useState } from 'react';
import MemberCard from './Team.MemberCard';
import { Team } from '@/types/Team';
import { useLocale } from 'next-intl';

export default function PeriodSelector({ teams }: { teams: Team[] }) {
    const locale = useLocale();
    const [selectedPeriod, setSelectedPeriod] = useState(teams[0]?.period);

    return (
        <div className="flex flex-col items-center space-y-12">
            <div className="flex flex-wrap justify-center gap-4">
                {teams.map((team) => (
                    <button
                        key={team.period}
                        onClick={() => setSelectedPeriod(team.period)}
                        className={`px-4 py-2 border rounded-sm ${
                            selectedPeriod === team.period ? 'bg-gray-200' : 'hover:bg-gray-100'
                        }`}
                    >
                        {team.period}
                    </button>
                ))}
            </div>

            {teams
                .filter((team) => team.period === selectedPeriod)
                .map((team) => (
                    <div key={team.period} className="flex flex-col items-center space-y-12">
                        <div className="flex flex-col items-center">
                            <MemberCard
                                name={team.management[0]?.name}
                                title={team.management[0]?.position[locale] || ''}
                                email={team.management[0]?.email}
                            />
                        </div>

                        {team.management[1] && (
                            <div className="flex flex-col items-center">
                                <div className="w-0.5 h-6 bg-gray-300" />
                                <MemberCard
                                    name={team.management[1]?.name}
                                    title={team.management[1]?.position[locale] || ''}
                                    email={team.management[1]?.email}
                                />
                            </div>
                        )}

                        <div className="flex flex-col items-center">
                            <div className="w-0.5 h-6 bg-gray-300" />
                            <div className="flex flex-wrap justify-center gap-12">
                                <div className="flex flex-col items-center space-y-4">
                                    <h3 className="text-lg font-semibold">Yönetim Kurulu</h3>
                                    {team.management.slice(2).map((member, idx2) => (
                                        <MemberCard
                                            key={idx2}
                                            name={member.name}
                                            title={member.position[locale] || ''}
                                            email={member.email}
                                        />
                                    ))}
                                </div>

                                <div className="flex flex-col items-center space-y-4">
                                    <h3 className="text-lg font-semibold">Denetim Kurulu</h3>
                                    {team.auditing.map((member, idx2) => (
                                        <MemberCard
                                            key={idx2}
                                            name={member.name}
                                            title={member.position[locale] || ''}
                                            email={member.email}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}
