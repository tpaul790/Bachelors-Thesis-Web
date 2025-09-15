import {Form, type FormProps, Input, Modal, notification, Select, Button, Space} from "antd";
import TextArea from "antd/es/input/TextArea";
import type {CreateProjectDto} from "../dto/ProjectDto.ts";
import {useSaveProjectMutation} from "../api/projectQueryApi.ts";
import {useState} from "react";
import {useDeleteTeamMutation, useSaveTeamMutation} from "../../team/api/teamQueryApi.ts";
import {useSaveMemberMutation} from "../../member/api/memberQueryApi.ts";
import {useGetTeamsForUserQuery} from "../../user/api/userQueryApi.ts";
import {skipToken} from "@reduxjs/toolkit/query";
import "./css/createProjectModal.css"
import {createTeam, removeTeam} from "../../team/utils/Functions.ts";
import {addMember} from "../../member/utils/Functions.ts";


interface IOwnProps {
    userId: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

type FieldType = {
    projectName: string;
    projectDescription: string;
    teamId?: number;
    newTeamName?: string;
}

export const CreateProjectModal = (props: IOwnProps) => {
    const [form] = Form.useForm<FieldType>();
    const { isOpen, setIsOpen, userId} = props;
    const [saveProject] = useSaveProjectMutation();
    const [saveTeam] = useSaveTeamMutation();
    const [deleteTeam] = useDeleteTeamMutation();
    const [saveMember] = useSaveMemberMutation();
    const { data: teams} = useGetTeamsForUserQuery(userId !== 0 ? userId : skipToken);
    const [isCreatingTeam, setIsCreatingTeam] = useState(false);


    const toggleModal = () => {
        setIsOpen(!isOpen);
        form.resetFields();
        setIsCreatingTeam(false);
    }

    const onFinish: FormProps<FieldType>["onFinish"] = async values => {
        let teamId;
        if(values.newTeamName){
            teamId = await createTeam(values.newTeamName, saveTeam);
            if(teamId && userId !== 0){
                await addMember(teamId, userId, saveMember);
            }
        }

        const project : CreateProjectDto = {
            name: values.projectName,
            description: values.projectDescription,
            teamId: teamId ? teamId : values.teamId!,
        };

        if(project.teamId) {
            try {
                await saveProject(project).unwrap();
                toggleModal()
                notification.success({
                    message: "Successfully Save",
                    description: "Project successfully created",
                    placement: "top",
                    duration: 3,
                });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                const errorMessage =
                    err?.data?.error || err?.message || "An unknown error occurred";
                form.resetFields();
                notification.error({
                    message: "Save Project Error",
                    description: errorMessage,
                    placement: "top",
                    duration: 3,
                })
                if (teamId) {
                    await removeTeam(teamId, deleteTeam);
                }
            }
        }
    }

    return (
        <Modal
            title="Create a new project"
            open={isOpen}
            onCancel={() => toggleModal()}
            width={500}
            classNames={{
                body: "my-modal-body",
                header: "my-modal-header",
                footer: "my-modal-footer",
                content: "my-modal-content",
            }}
            okText="Create"
            okButtonProps={{
                form: "createProjectForm",
                htmlType: "submit",
            }}
        >
            <Form
                id="createProjectForm"
                name="register"
                layout="vertical"
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name="projectName"
                    rules={[
                        { required: true, message: "Please enter the project name" },
                        { pattern: /^[A-Za-z][A-Za-z0-9 ]*$/, message: "The project name should start with a letter" },
                    ]}
                >
                    <Input placeholder="Project Name" size="large" />
                </Form.Item>
                <Form.Item
                    name="projectDescription"
                    rules={[
                        { required: true, message: "Please enter the project description" },
                    ]}
                >
                    <TextArea placeholder="Project Description" size="large" />
                </Form.Item>

                {!isCreatingTeam && (
                    <Form.Item
                        name="teamId"
                        rules={[
                            { required: true, message: "Please choose a team or create one" },
                        ]}
                    >
                        <Select
                            className="select-team-list"
                            placeholder="Choose one of your teams"
                            options={teams?.map(team => ({ label: team.name, value: team.id }))}
                            size="large"
                            popupRender={menu => (
                                <>
                                    {menu}
                                    <Space style={{ padding: "8px" }}>
                                        <Button type="link" onClick={() => setIsCreatingTeam(true)}>
                                            + Create New Team
                                        </Button>
                                    </Space>
                                </>
                            )}
                        />
                    </Form.Item>
                )}

                {isCreatingTeam && (
                    <Form.Item
                        name="newTeamName"
                        rules={[{ required: true, message: "Please enter the new team name" }]}
                    >
                        <Input
                            placeholder="Enter team name"
                            size="large"
                            addonAfter={
                                <Button type="link" onClick={() => setIsCreatingTeam(false)}>
                                    Cancel
                                </Button>
                            }
                        />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    )
}
