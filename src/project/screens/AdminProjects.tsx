import Navbar from "../../components/navigation/Navbar.tsx";
import { Layout, Pagination, Spin} from "antd";
import {useSelector} from "react-redux";
import type {RootState} from "../../api/store.ts";
import {useState} from "react";
import {Content} from "antd/es/layout/layout";
import {ProjectsHeader} from "../components/ProjectsHeader.tsx";
import type {ProjectSummaryDto} from "../dto/ProjectDto.ts";
import {ProjectSummary} from "../components/ProjectSummary.tsx";
import {CreateProjectModal} from "../components/CreateProjectModal.tsx";
import {useGetProjectsQuery} from "../api/projectQueryApi.ts";

export const AdminProjects = () => {
    const user = useSelector((state: RootState) => state.loggedUser.user);
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(4);
    const { data , isLoading } = useGetProjectsQuery({pageNumber: pageNumber - 1, pageSize});
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
                    <h2>Here is an overview of <span className="highlight-text">all existing projects</span></h2>
                </div>

                {isLoading ? (
                    <div className="loading-spinner">
                        <Spin tip="Loading projects..." size="large" />
                    </div>
                ) : (
                    <div className="dashboard-projects">

                        <ProjectsHeader/>

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
}