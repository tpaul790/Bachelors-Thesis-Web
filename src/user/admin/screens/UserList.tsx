import {Layout, Spin} from "antd";
import Navbar from "../../../components/navigation/Navbar.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../../api/store.ts";
import {UserListTable} from "../components/UserListTable.tsx";
import {Content} from "antd/es/layout/layout";
import {useGetAllUsersQuery} from "../../api/userQueryApi.ts";

export const UserList = () => {
    const user = useSelector((state: RootState) => state.loggedUser.user);
    const { data: users, isLoading } = useGetAllUsersQuery();
    return (
        <Layout>
            <Navbar iconNumber={user ? user.id : 0} invitationNumber={2} />
            <Content className="content"  >
                <div className="text-container">
                    <h2>Here is an overview of <span className="highlight-text">all existing users</span></h2>
                </div>
                {isLoading ? (
                        <div className="loading-spinner">
                            <Spin tip="Loading projects..." size="large" />
                        </div>
                    ) : (
                    <UserListTable users={users ?? []} />)
                }
            </Content>
        </Layout>
    )
}