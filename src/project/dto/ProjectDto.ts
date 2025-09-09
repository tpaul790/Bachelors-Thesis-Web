import type { TeamProjectSummaryDto} from "../../team/dto/TeamDto.ts";

export interface CreateProjectDto{
    name: string;
    description: string;
    teamId: number;
}

export interface ProjectSummaryDto{
    id:number;
    name: string;
    description: string;
    createdAt: number;
    team: TeamProjectSummaryDto;
}