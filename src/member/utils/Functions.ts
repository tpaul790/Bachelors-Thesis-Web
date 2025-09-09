import {type CreateMemberDto, MemberRole} from "../dto/MemberDto.ts";
import {notification} from "antd";
import {useDeleteMemberMutation, type useSaveMemberMutation} from "../api/memberQueryApi.ts";

type SaveMemberTrigger = ReturnType<typeof useSaveMemberMutation>[0];
type DeleteMemberTrigger = ReturnType<typeof useDeleteMemberMutation>[0];


export const addMember = async (
    teamId: number,
    userId: number,
    saveMember: SaveMemberTrigger
) => {
    const member : CreateMemberDto = {
        userId,
        teamId,
        role: MemberRole.MANAGER,
    }

    try{
        await saveMember(member);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any){
        const errorMessage =
            err?.data?.error || err?.message || "An unknown error occurred";
        notification.error({
            message: "Save Member Error",
            description: errorMessage,
            placement: "top",
            duration: 3,
        })
    }
}

export const removeMember = async (
    id: number,
    deleteMember: DeleteMemberTrigger
) => {

    try{
        await deleteMember(id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any){
        const errorMessage =
            err?.data?.error || err?.message || "An unknown error occurred";
        notification.error({
            message: "Delete Member Error",
            description: errorMessage,
            placement: "top",
            duration: 3,
        })
    }
}