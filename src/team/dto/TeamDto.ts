import type { MemberSummaryDto} from "../../member/dto/MemberDto.ts";

export interface CreateTeamDto {
    name: string;
}

export interface TeamDto {
    id: number;
    name: string;
    createdAt?: number;
}

export interface TeamSummaryDto{
    id: number;
    name: string;
    createdAt: number;
    members: MemberSummaryDto[];
}

export interface TeamProjectSummaryDto{
    id: number;
    name: string;
    createdAt: number;
    members: MemberSummaryDto[];
}