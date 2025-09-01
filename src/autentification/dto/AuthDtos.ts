import type {UserRole} from "../../user/dto/UserDtos.ts";

export interface LoginResponse {
    token: string
}

export interface LoginRequest {
    username: string
    password: string
}

export interface RegisterResponse{
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

export interface RegisterRequest{
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    iconNumber: number
}