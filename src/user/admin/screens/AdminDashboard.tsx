import {Layout} from "antd";
import Navbar from "../../../components/navigation/Navbar.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../../api/store.ts";


export const AdminDashboard = () => {
    const user = useSelector((state: RootState) => state.loggedUser.user);

    return(
        <Layout>
            <Navbar iconNumber={user?.iconNumber ?? 0} />
        </Layout>
    )
}