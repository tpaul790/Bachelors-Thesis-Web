import {apiSlice} from "../../api/apiSlice.ts";
import type {UserDto, UserUpdateDto} from "../dto/UserDtos.ts";
import {userUrl} from "../../utils/constants.ts";

const userQueryApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserById: builder.query<UserDto, number>({
            query: (id: number) => ({
                url: `${userUrl}/${id}`,
                method: "GET"
            }),
            providesTags: ["users"]
        }),
        updateUser: builder.mutation<UserDto, UserUpdateDto>({
            query: (request: UserUpdateDto) =>({
                url: `${userUrl}/user-${request.id}`,
                method: "PUT",
                body: request
            }),
            invalidatesTags: ["users"]
        }),
    })
});

export const { useUpdateUserMutation, useLazyGetUserByIdQuery } = userQueryApi;