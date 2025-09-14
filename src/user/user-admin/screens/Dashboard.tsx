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
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const { data , isLoading } = useGetProjectsForUserQuery(
        user ?
            {
                id: user.id,
                page: {pageNumber: pageNumber - 1, pageSize}
            }
            : skipToken);
    const projects = data ? data.content : [];
    const page = data ? data.page : undefined;

    const handleAfterDeleteProject = () => {
        if(projects.length === 1 && pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    return (
        <Layout>
            <Navbar iconNumber={user?.iconNumber ?? 0} invitationNumber={2} />
            <Content className="dashboard-content">
                <div className="dashboard-text">
                    <Button
                        type="primary"
                        className="create-btn create-btn-position"
                        onClick={() => setCreateProjectModalOpen(true)}
                    >
                        Create Project
                    </Button>
                    <h2>Welcome back, <span className="highlight-text">{user?.username}</span></h2>
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
                            <ProjectSummary key={project.id} project={project} handleAfterDeleteProject = {handleAfterDeleteProject}/>
                        ))}

                        <Pagination
                            className="pagination-buttons"
                            current={pageNumber}
                            pageSize={pageSize}
                            total={page ? page.totalElements : 0}
                            onChange={(newPage, newPageSize) => {
                                setPageNumber(newPage);
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