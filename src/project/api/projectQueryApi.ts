import {apiSlice} from "../../api/apiSlice.ts";
import {projectUrl} from "../../utils/constants.ts";
import type {CreateProjectDto} from "../dto/ProjectDto.ts";

const projectQueryApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        saveProject: builder.mutation<void, CreateProjectDto>({
            query: (request: CreateProjectDto) => ({
                url: `${projectUrl}`,
                method: "POST",
                body: request
            }),
            invalidatesTags: ["projects"]
        }),
        deleteProject: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `${projectUrl}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["projects"]
        })
    })
})

export const { useSaveProjectMutation, useDeleteProjectMutation } = projectQueryApi;

