import {apiSlice} from "../../api/apiSlice.ts";
import type {TeamDto} from "../dto/TeamDto.ts";
import {teamUrl} from "../../utils/constants.ts";

const teamQueryApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        saveTeam: builder.mutation<void, TeamDto>({
            query: (request: TeamDto) => ({
                url: `${teamUrl}`,
                method: "POST",
                body: request
            }),
            invalidatesTags: ["teams"]
        }),
    })
})

export const { useSaveTeamMutation } = teamQueryApi;

