import {apiSlice} from "../../api/apiSlice.ts";
import type {CreateMemberDto, MemberDto} from "../dto/MemberDto.ts";
import {memberUrl} from "../../utils/constants.ts";

const memberQueryApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        saveMember: builder.mutation<MemberDto, CreateMemberDto>({
            query: (request: CreateMemberDto) => ({
                url: `${memberUrl}`,
                method: "POST",
                body: request
            }),
            invalidatesTags: ["teams","teams_summary"]
        }),
        deleteMember: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `${memberUrl}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["teams","teams_summary"]
        }),
    }),
})

export const { useSaveMemberMutation, useDeleteMemberMutation } = memberQueryApi