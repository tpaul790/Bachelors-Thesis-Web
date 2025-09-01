import {apiSlice} from "../../api/apiSlice.ts";
import type {LoginResponse, LoginRequest, RegisterRequest, RegisterResponse} from "../dto/AuthDtos.ts";

const authQueryApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (request: LoginRequest) =>({
                url: "/login",
                method: "POST",
                body: request
            }),
            invalidatesTags: []
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (request: RegisterRequest) => ({
                url: "/register",
                method: "POST",
                body:request
            }),
            invalidatesTags: []
        }),
    })
});

export const { useLoginMutation , useRegisterMutation } = authQueryApi;