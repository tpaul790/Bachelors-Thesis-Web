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
            invalidatesTags: ["teams"]
        }),
    }),
})

export const { useSaveMemberMutation } = memberQueryApi