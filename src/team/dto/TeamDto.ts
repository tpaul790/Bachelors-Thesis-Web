export interface CreateTeamDto {
    name: string;
}

export interface TeamSummaryDto {
    id: number;
    name: string;
}

export interface TeamProjectSummaryDto{
    id: number;
    name: string;
    createdAt: number;
    icons: number[];
}