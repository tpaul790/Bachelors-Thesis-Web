import type {UserDto, UserSummaryDto} from "../../user/dto/UserDtos.ts";
import type {TeamDto} from "../../team/dto/TeamDto.ts";

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
    team: TeamDto;
    role: MemberRole;
}

export interface MemberSummaryDto{
    id: number;
    user: UserSummaryDto;
    role: MemberRole;
}