import {Button, Col, Layout, Pagination, Row, Spin} from "antd";
import Navbar from "../../components/navigation/Navbar.tsx";
import {Content} from "antd/es/layout/layout";
import {useSelector} from "react-redux";
import type {RootState} from "../../api/store.ts";
import {TeamSummary} from "../components/TeamSummary.tsx";
import { useGetTeamsSummaryForUserQuery} from "../../user/api/userQueryApi.ts";
import {skipToken} from "@reduxjs/toolkit/query";
import "./teams.css"
import {useState} from "react";
import {CreateTeamModal} from "../components/CreateTeamModal.tsx";

export const UserTeams = () => {
    const user = useSelector((state: RootState) => state.loggedUser.user);
    //TODO - make this method paginated
    const { data: teams, isLoading } = useGetTeamsSummaryForUserQuery(user ? user.id : skipToken);
    const [ createTeamModalOpen, setCreateTeamModalOpen ] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);

    return(
        <Layout>
            <Navbar iconNumber={user?.iconNumber ?? 0} invitationNumber={2} />
            <Content className="teams-content">
                <div className="teams-text">
                    <h2>Here is an overview of <span className="username-text">{user?.username}'s</span> teams</h2>
                    <Button
                        type="primary"
                        className="create-btn"
                        onClick={() => setCreateTeamModalOpen(true)}
                    >
                        Create Team
                    </Button>
                </div>
                {isLoading ? (
                    <div className="loading-spinner">
                        <Spin tip="Loading projects..." size="large" />
                    </div>) : (
                    <div className="teams-list">
                        <Row align="middle" className="teams-header-row">
                            <Col flex="220px">Project Manager</Col>
                            <Col flex="180px">Created</Col>
                            <Col flex="160px">Team Name</Col>
                            <Col flex="180px">Developers</Col>
                            <Col flex="80px">Actions</Col>
                        </Row>
                        {teams?.map(team => <TeamSummary key={team.id} userId={user ? user.id : 0} team={team} />)}
                        <Pagination
                            className="pagination-buttons"
                            current={page}
                            pageSize={pageSize}
                            total={teams ? teams.length : 0}
                            onChange={(newPage, newPageSize) => {
                                setPage(newPage);
                                setPageSize(newPageSize);
                            }}
                        />
                    </div>)
                }
            </Content>

            <CreateTeamModal userId={user ? user.id : 0} isOpen={createTeamModalOpen} setIsOpen={setCreateTeamModalOpen} />

        </Layout>
    )
}