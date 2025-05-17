export interface TeamMember {
    _id?: string;
    name: string;
    position: Record<string, string>;
    description: Record<string, string>;
    email: string;
    linkedin: string;
}

export interface Team {
    _id?: string;
    period: string;
    management: TeamMember[];
    auditing: TeamMember[];
}
