import {apiSlice} from "../../api/apiSlice.ts";
import type {UserDto, UserUpdateDto} from "../dto/UserDtos.ts";
import {projectUrl, teamUrl, userUrl} from "../../utils/constants.ts";
import type { ProjectSummaryDto} from "../../project/dto/ProjectDto.ts";
import type {TeamDto, TeamSummaryDto} from "../../team/dto/TeamDto.ts";
import type {PageRequest, PageResponse} from "../../utils/pagination/PaginationDto.ts";

const userQueryApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserById: builder.query<UserDto, number>({
            query: (id: number) => ({
                url: `${userUrl}/${id}`,
                method: "GET"
            }),
            providesTags: ["users"]
        }),

        deleteUser: builder.mutation<void, number>({
           query: (id: number) => ({
               url: `${userUrl}/${id}`,
               method: "DELETE"
           }),
            invalidatesTags: ["users"]
        }),

        getAllUsers: builder.query<UserDto[], void>({
           query: () => ({
               url: `${userUrl}`,
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

        updateAdmin: builder.mutation<UserDto, UserUpdateDto>({
            query: (request: UserUpdateDto) =>({
                url: `${userUrl}/admin-${request.id}`,
                method: "PUT",
                body: request
            }),
            invalidatesTags: ["users"]
        }),

        getProjectsForUser: builder.query<
            PageResponse<ProjectSummaryDto>,
            { id: number, page: PageRequest }
        >({
            query: ({id, page : {pageNumber, pageSize}}) => ({
                url: `${userUrl}/${id}/${projectUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: "GET",
            }),
            providesTags: ["projects"]
        }),

        getTeamsForUser: builder.query<TeamDto[], number>({
            query: (id: number) => ({
                url: `${userUrl}/${id}/${teamUrl}`,
                method: "GET"
            }),
            providesTags: ["teams"]
        }),

        getTeamsSummaryForUser: builder.query<
            PageResponse<TeamSummaryDto>,
            {id: number, page: PageRequest}>
        ({
            query: ({id, page:{pageNumber, pageSize}}) => ({
                url: `${userUrl}/${id}/${teamUrl}-summary?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: "GET"
            }),
            providesTags: ["teams_summary"]
        })
    })
});

export const {
    useUpdateUserMutation,
    useUpdateAdminMutation,
    useDeleteUserMutation,
    useGetAllUsersQuery,
    useLazyGetUserByIdQuery,
    useGetProjectsForUserQuery,
    useGetTeamsForUserQuery,
    useGetTeamsSummaryForUserQuery,
} = userQueryApi;