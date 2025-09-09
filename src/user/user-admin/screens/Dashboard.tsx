import {Button, Col, Layout, Row, Spin} from "antd";
import Navbar from "../../../components/navigation/Navbar.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../../api/store.ts";
import type { ProjectSummaryDto} from "../../../project/dto/ProjectDto.ts";
import { ProjectSummary } from "../../../project/components/ProjectSummary.tsx";
import "./dashboard.css";
import "../../../App.css"
import {skipToken} from "@reduxjs/toolkit/query";
import {useGetProjectsForUserQuery} from "../../api/userQueryApi.ts";
import {Content} from "antd/es/layout/layout";
import {useState} from "react";
import {CreateProjectModal} from "../components/CreateProjectModal.tsx";

export const Dashboard = () => {
    const user = useSelector((state: RootState) => state.loggedUser.user);
    const { data: projects = [] , isLoading } = useGetProjectsForUserQuery(user ? user.id : skipToken);
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);


    return(
        <Layout>
            <Navbar iconNumber={user?.iconNumber ?? 0} invitationNumber={2} />
            <Content className="dashboard-content">
                <div className="dashboard-text">
                    <h2>{`Welcome back, ${user?.username}`}</h2>
                    <Button
                        type="primary"
                        className="create-project-btn"
                        onClick={() => setCreateProjectModalOpen(true)}
                    >
                        Create Project
                    </Button>
                </div>
                {isLoading ? (
                    <div className="loading-spinner">
                        <Spin tip="Loading projects..." size="large" />
                    </div>) : (
                    <div className="dashboard-projects">
                        <Row align="middle" className="admin-dashboard-projects-header-row">
                            <Col flex="200px">Project Name</Col>
                            <Col flex="160px">Created</Col>
                            <Col flex="200px">Team Name</Col>
                            <Col flex="180px">Members</Col>
                            <Col flex="40px">Action</Col>
                        </Row>
                        { projects.map((project: ProjectSummaryDto) => (<ProjectSummary key={project.id} project={project} />)) }
                    </div>)
                }
            </Content>

           <CreateProjectModal userId={user ? user.id : 0} isOpen={createProjectModalOpen} setIsOpen={setCreateProjectModalOpen} />

        </Layout>
    )
}