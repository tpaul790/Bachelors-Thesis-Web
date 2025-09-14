import {apiSlice} from "../../api/apiSlice.ts";
import type {CreateTeamDto, TeamDto, TeamSummaryDto} from "../dto/TeamDto.ts";
import {teamUrl} from "../../utils/constants.ts";
import type {PageRequest, PageResponse} from "../../utils/pagination/PaginationDto.ts";

const teamQueryApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        saveTeam: builder.mutation<TeamDto, CreateTeamDto>({
            query: (request) => ({
                url: `${teamUrl}`,
                method: "POST",
                body: request
            }),
            invalidatesTags: []
        }),

        deleteTeam: builder.mutation<void, number>({
            query: (id) => ({
                url: `${teamUrl}/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["teams_summary"]
        }),

        findAllTeams: builder.query<
            PageResponse<TeamSummaryDto>,
            PageRequest
        >({
            query: ({ pageNumber, pageSize } : PageRequest) => ({
                url: `${teamUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: "GET"
            }),
            providesTags: ["teams_summary"]
        })
    })
})

export const {
    useSaveTeamMutation,
    useDeleteTeamMutation,
    useFindAllTeamsQuery
} = teamQueryApi;

