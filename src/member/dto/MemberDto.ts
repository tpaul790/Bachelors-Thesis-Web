import type {UserDto} from "../../user/dto/UserDtos.ts";
import type {TeamSummaryDto} from "../../team/dto/TeamDto.ts";

export const MemberRole = {
    MANAGER: "MANAGER",
    DEVELOPER: "DEVELOPER"
} as const;
export type MemberRole = (typeof MemberRole)[keyof typeof MemberRole];

export interface CreateMemberDto {
    userId: number;
    teamId: number;
    role: MemberRole;
}

export interface MemberDto{
    id: number;
    user: UserDto;
    team: TeamSummaryDto;
    role: MemberRole;
}