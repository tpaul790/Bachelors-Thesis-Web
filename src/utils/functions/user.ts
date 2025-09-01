import {UserRole} from "../../user/dto/UserDtos.ts";

export const isAdmin = (userRole: UserRole) =>
    userRole !== undefined && userRole === UserRole.ADMIN;

export const isUser = (userRole: UserRole) =>
    userRole !== undefined && userRole === UserRole.USER;