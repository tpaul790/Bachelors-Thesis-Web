import {useSelector} from "react-redux";
import type {RootState} from "../../api/store.ts";
import {useState} from "react";
import {  Layout, Pagination, Spin} from "antd";
import Navbar from "../../components/navigation/Navbar.tsx";
import {Content} from "antd/es/layout/layout";
import {TeamSummary} from "../components/TeamSummary.tsx";
import {TeamsHeader} from "../components/TeamsHeader.tsx";
import {useFindAllTeamsQuery} from "../api/teamQueryApi.ts";

export const AdminTeams = () => {
    const user = useSelector((state: RootState) => state.loggedUser.user);
    //TODO - make this method paginated
    const { data: teams, isLoading } = useFindAllTeamsQuery();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);

    return(
        <Layout>
            <Navbar iconNumber={user?.iconNumber ?? 0} invitationNumber={2} />
            <Content className="teams-content">
                <div className="teams-text">
                    <h2>Here is an overview of <span className = "highlight-text">all the existing teams</span></h2>
                </div>
                {isLoading ? (
                    <div className="loading-spinner">
                        <Spin tip="Loading teams..." size="large" />
                    </div>) : (
                    <div className="teams-list">
                        <TeamsHeader/>
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
        </Layout>
    )
}