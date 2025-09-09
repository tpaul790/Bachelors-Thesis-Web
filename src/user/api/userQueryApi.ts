import {apiSlice} from "../../api/apiSlice.ts";
import type {UserDto, UserUpdateDto} from "../dto/UserDtos.ts";
import {projectUrl, teamUrl, userUrl} from "../../utils/constants.ts";
import type { ProjectSummaryDto} from "../../project/dto/ProjectDto.ts";
import type {TeamSummaryDto} from "../../team/dto/TeamDto.ts";

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
        getProjectsForUser: builder.query<ProjectSummaryDto[], number>({
            query: (id: number) => ({
                url: `${userUrl}/${id}/${projectUrl}`,
                method: "GET",
            }),
            providesTags: ["projects"]
        }),
        getTeamsForUser: builder.query<TeamSummaryDto[], number>({
            query: (id: number) => ({
                url: `${userUrl}/${id}/${teamUrl}`,
                method: "GET"
            }),
            providesTags: ["teams"]
        })
    })
});

export const {
    useUpdateUserMutation,
    useLazyGetUserByIdQuery,
    useGetProjectsForUserQuery,
    useGetTeamsForUserQuery,
} = userQueryApi;