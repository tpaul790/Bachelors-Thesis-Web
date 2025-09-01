import { Layout, Menu } from "antd";
import {
    HomeOutlined,
    TeamOutlined,
    ProjectOutlined,
    ProfileOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import {getRoleFromToken} from "../../utils/functions/token.ts";
import {UserRole} from "../../user/dto/UserDtos.ts";

const { Header } = Layout;

const Navbar = () => {
    const location = useLocation();
    const userRole = getRoleFromToken()

    const adminItems = [
        {
            key: "/admin-dashboard",
            icon: <HomeOutlined />,
            label: <Link to="/admin-dashboard">Dashboard</Link>,
        },
        {
            key: "/users",
            icon: <TeamOutlined />,
            label: <Link to="/users">User List</Link>,
        },
        {
            key: "/projects",
            icon: <ProjectOutlined />,
            label: <Link to="/projects">Projects</Link>,
        },
        {
            key: "/profile",
            icon: <ProfileOutlined />,
            label: <Link to="/profile">Profile</Link>,
        },
    ];

    const userItems = [
        {
            key: "/user-dashboard",
            icon: <HomeOutlined />,
            label: <Link to="/user-dashboard">Dashboard</Link>,
        },
        {
            key: "/teams",
            icon: <TeamOutlined />,
            label: <Link to="/users">Teams</Link>,
        },
        {
            key: "/profile",
            icon: <ProfileOutlined />,
            label: <Link to="/profile">Profile</Link>,
        },
    ]

    return (
        <Header className="navbar-header">
            <div className="navbar-logo">Synergy</div>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={userRole === UserRole.ADMIN ? adminItems : userItems}
                className="navbar-menu"
            />
        </Header>
    );
};

export default Navbar;
