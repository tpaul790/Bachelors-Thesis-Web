import {apiSlice} from "../../api/apiSlice.ts";
import {projectUrl} from "../../utils/constants.ts";
import type {CreateProjectDto, ProjectSummaryDto} from "../dto/ProjectDto.ts";
import type {PageRequest, PageResponse} from "../../utils/pagination/PaginationDto.ts";

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
        }),

        getProjects: builder.query<
            PageResponse<ProjectSummaryDto>,
            PageRequest>
        ({
            query: (page) => ({
                url: `${projectUrl}?pageNumber=${page.pageNumber}&pageSize=${page.pageSize}`,
                method: "GET"
            }),
            providesTags: ["projects"]
        })
    })
})

export const { useSaveProjectMutation, useDeleteProjectMutation, useGetProjectsQuery } = projectQueryApi;

