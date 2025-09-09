import {notification} from "antd";
import type {CreateTeamDto, TeamDto} from "../dto/TeamDto.ts";
import {useDeleteTeamMutation, type useSaveTeamMutation} from "../api/teamQueryApi.ts";

type SaveTeamTrigger = ReturnType<typeof useSaveTeamMutation>[0];
type DeleteTeamTrigger = ReturnType<typeof useDeleteTeamMutation>[0];

export const createTeam = async (
    teamName: string,
    saveTeam: SaveTeamTrigger
) => {
    const team: CreateTeamDto = { name: teamName };

    try {
        const result: TeamDto = await saveTeam(team).unwrap();
        return result.id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        const errorMessage =
            err?.data?.error || err?.message || "An unknown error occurred";
        notification.error({
            message: "Save Team Error",
            description: errorMessage,
            placement: "top",
            duration: 3,
        });
    }
};

export const removeTeam = async (
    id: number,
    deleteTeam: DeleteTeamTrigger
) => {
    try{
        await deleteTeam(id).unwrap();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any){
        const errorMessage =
            err?.data?.error || err?.message || "An unknown error occurred";
        notification.error({
            message: "Delete Team Error",
            description: errorMessage,
            placement: "top",
            duration: 3,
        })
    }
}