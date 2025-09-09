import {Button, Col, Layout, Pagination, Row, Spin} from "antd";
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
import {CreateProjectModal} from "../../../project/components/CreateProjectModal.tsx";

export const Dashboard = () => {
    const user = useSelector((state: RootState) => state.loggedUser.user);
    //TODO - make this method paginated
    const { data: projects = [] , isLoading } = useGetProjectsForUserQuery(user ? user.id : skipToken);
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);


    return (
        <Layout>
            <Navbar iconNumber={user?.iconNumber ?? 0} invitationNumber={2} />
            <Content className="dashboard-content">
                <div className="dashboard-text">
                    <h2>Welcome back, <span className="username-text">{user?.username}</span></h2>
                    <Button
                        type="primary"
                        className="create-btn"
                        onClick={() => setCreateProjectModalOpen(true)}
                    >
                        Create Project
                    </Button>
                </div>

                {isLoading ? (
                    <div className="loading-spinner">
                        <Spin tip="Loading projects..." size="large" />
                    </div>
                ) : (
                    <div className="dashboard-projects">
                        <Row align="middle" className="admin-dashboard-projects-header-row">
                            <Col flex="190px">Project Name</Col>
                            <Col flex="160px">Created</Col>
                            <Col flex="160px">Team Name</Col>
                            <Col flex="160px">Members</Col>
                            <Col flex="40px">Action</Col>
                        </Row>
                        {projects.map((project: ProjectSummaryDto) => (
                            <ProjectSummary key={project.id} project={project} />
                        ))}

                        <Pagination
                            className="pagination-buttons"
                            current={page}
                            pageSize={pageSize}
                            total={projects.length}
                            onChange={(newPage, newPageSize) => {
                                setPage(newPage);
                                setPageSize(newPageSize);
                            }}
                        />
                    </div>
                )}
            </Content>

            <CreateProjectModal
                userId={user ? user.id : 0}
                isOpen={createProjectModalOpen}
                setIsOpen={setCreateProjectModalOpen}
            />
        </Layout>
    )
};