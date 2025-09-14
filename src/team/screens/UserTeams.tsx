import {Button, Layout, Pagination, Spin} from "antd";
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
import {TeamsHeader} from "../components/TeamsHeader.tsx";

export const UserTeams = () => {
    const user = useSelector((state: RootState) => state.loggedUser.user);
    const [ createTeamModalOpen, setCreateTeamModalOpen ] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const { data, isLoading } = useGetTeamsSummaryForUserQuery(user ? {id: user.id, page:{pageNumber: pageNumber - 1, pageSize}} : skipToken);
    const teams = data ? data.content : [];
    const page = data ? data.page : undefined;

    const handleAfterDeleteTeam = () => {
        if(teams.length === 1 && pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }


    return(
        <Layout>
            <Navbar iconNumber={user?.iconNumber ?? 0} invitationNumber={2} />
            <Content className="teams-content">
                <div className="teams-text">
                    <Button
                        type="primary"
                        className="create-btn create-btn-position"
                        onClick={() => setCreateTeamModalOpen(true)}
                    >
                        Create Team
                    </Button>
                    <h2>Here is an overview of <span className="highlight-text">{user?.username}'s</span> teams</h2>

                </div>
                {isLoading ? (
                    <div className="loading-spinner">
                        <Spin tip="Loading teams..." size="large" />
                    </div>) : (
                    <div className="teams-list">
                        <TeamsHeader/>
                        {teams?.map(team => <TeamSummary key={team.id} userId={user ? user.id : 0} team={team} handleAfterDeleteTeam={handleAfterDeleteTeam} />)}
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
                    </div>)
                }
            </Content>

            <CreateTeamModal userId={user ? user.id : 0} isOpen={createTeamModalOpen} setIsOpen={setCreateTeamModalOpen} />

        </Layout>
    )
}