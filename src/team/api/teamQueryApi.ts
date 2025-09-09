import {apiSlice} from "../../api/apiSlice.ts";
import type {CreateTeamDto, TeamDto} from "../dto/TeamDto.ts";
import {teamUrl} from "../../utils/constants.ts";

const teamQueryApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        saveTeam: builder.mutation<TeamDto, CreateTeamDto>({
            query: (request: CreateTeamDto) => ({
                url: `${teamUrl}`,
                method: "POST",
                body: request
            }),
            invalidatesTags: []
        }),
        deleteTeam: builder.mutation<void, number>({
            query: (id) => ({
                url: `${teamUrl}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["teams_summary"]
        }),
    })
})

export const { useSaveTeamMutation, useDeleteTeamMutation } = teamQueryApi;

