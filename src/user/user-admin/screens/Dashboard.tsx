import {Button, Form, type FormProps, Input, Layout, Modal, notification, Spin} from "antd";
import Navbar from "../../../components/navigation/Navbar.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../../api/store.ts";
import type {CreateProjectDto, ProjectSummaryDto} from "../../../project/dto/ProjectDto.ts";
import { ProjectSummary } from "../../../project/components/ProjectSummary.tsx";
import "./dashboard.css";
import "../../../App.css"
import {skipToken} from "@reduxjs/toolkit/query";
import {useGetProjectsForUserQuery} from "../../api/userQueryApi.ts";
import {Content} from "antd/es/layout/layout";
import {useState} from "react";
import TextArea from "antd/es/input/TextArea";
import {useSaveProjectMutation} from "../../../project/api/projectQueryApi.ts";

interface FieldType{
    name: string;
    description: string;
}

export const Dashboard = () => {
    const user = useSelector((state: RootState) => state.loggedUser.user);
    const { data: projects = [] , isLoading } = useGetProjectsForUserQuery(user ? user.id : skipToken);
    const [saveProject] = useSaveProjectMutation();
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);
    const [form] = Form.useForm<FieldType>();

    const toggleModal = () => {
        setCreateProjectModalOpen(prev => !prev);
        form.resetFields();
    }

    const onFinish: FormProps<FieldType>["onFinish"] = async values => {
        const project : CreateProjectDto = {
            name: values.name,
            description: values.description,
        };
        try{
            await saveProject(project).unwrap();
            toggleModal()
            notification.success({
                message: "Successfully Save",
                description: "Project successfully created",
                placement: "top",
                duration: 3,
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(err: any){
            const errorMessage =
                err?.data?.error || err?.message || "An unknown error occurred";
            form.resetFields();
            notification.error({
                message: "Save Error",
                description: errorMessage,
                placement: "top",
                duration: 3,
            })
        }
    }

    return(
        <Layout>
            <Navbar iconNumber={user?.iconNumber ?? 0} />
            <Content className="dashboard-content">
                <div className="dashboard-text">
                    <h2>{`Welcome back, ${user?.username}`}</h2>
                    <Button
                        type="primary"
                        className="create-project-btn"
                        onClick={() => toggleModal()}
                    >
                        Create Project
                    </Button>
                </div>
                {isLoading ? (
                    <div className="loading-spinner">
                        <Spin tip="Loading projects..." size="large" />
                    </div>) : (
                    <div className="dashboard-projects">
                        { projects.map((project: ProjectSummaryDto) => (<ProjectSummary key={project.id} project={project} />)) }
                    </div>)
                }
            </Content>

            <Modal
                title="Create a new project"
                open={createProjectModalOpen}
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
                        name="name"
                        rules={[
                            { required: true, message: "Please enter the project name" },
                            { pattern: /^[A-Za-z]+$/, message: "The project name should only contain letters" },
                        ]}
                    >
                        <Input placeholder="Project Name" size="large" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        rules={[
                            { required: true, message: "Please enter the project description" },
                        ]}
                    >
                        <TextArea placeholder="Project Description" size="large" />
                    </Form.Item>
                </Form>
            </Modal>

        </Layout>
    )
}