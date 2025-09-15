export const UserRole = {
    USER: "USER",
    ADMIN: "ADMIN"
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface UserDto{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    iconNumber: number,
    active ?: boolean,
    lastActive ?: string,
    userRole : UserRole,
}

export interface UserUpdateDto {
    id: number,
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
    iconNumber?: number;
    userRole?: UserRole;
}

export interface UserSummaryDto{
    id: number,
    firstName: string,
    lastName: string,
    iconNumber: number,
}