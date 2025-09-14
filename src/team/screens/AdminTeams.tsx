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
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(4);
    const { data: data, isLoading } = useFindAllTeamsQuery({pageNumber: pageNumber - 1, pageSize});
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
                    <h2>Here is an overview of <span className = "highlight-text">all the existing teams</span></h2>
                </div>
                {isLoading ? (
                    <div className="loading-spinner">
                        <Spin tip="Loading teams..." size="large" />
                    </div>) : (
                    <div className="teams-list">
                        <TeamsHeader/>
                        {teams?.map(team => <TeamSummary key={team.id} userId={user ? user.id : 0} team={team} handleAfterDeleteTeam = {handleAfterDeleteTeam} />)}
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
        </Layout>
    )
}