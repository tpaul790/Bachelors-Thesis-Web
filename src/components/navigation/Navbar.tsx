import { Avatar, Dropdown, Layout } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import "../../App.css"
import { getRoleFromToken } from "../../utils/functions/token.ts";
import { UserRole } from "../../user/dto/UserDtos.ts";
import { getAvatarByIconNumber } from "../../utils/functions/user.ts";

const { Header } = Layout;

interface IOwnProps {
    iconNumber: number;
}

const Navbar = (props: IOwnProps) => {
    const { iconNumber } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const userRole = getRoleFromToken();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const profileMenuItems = [
        {
            key: "view-profile",
            icon: <UserOutlined />,
            label: <Link to="/profile">View Profile</Link>,
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Logout",
            onClick: handleLogout,
        },
    ];

    console.log(location.pathname);

    return (
        <Header className="navbar-header">
            <div className="navbar-logo">Synergy</div>

            <div className="navbar-right">
                <div className="navbar-links">
                    {userRole === UserRole.ADMIN ? (
                        <>
                            <Link
                                to="/dashboard"
                                className={location.pathname === "/dashboard" ? "active-link" : ""}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/users"
                                className={location.pathname === "/users" ? "active-link" : ""}
                            >
                                User List
                            </Link>
                            <Link
                                to="/projects"
                                className={location.pathname === "/projects" ? "active-link" : ""}
                            >
                                Projects
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/dashboard"
                                className={location.pathname === "/dashboard" ? "active-link" : ""}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/teams"
                                className={location.pathname === "/teams" ? "active-link" : ""}
                            >
                                Teams
                            </Link>
                        </>
                    )}
                </div>

                <Dropdown
                    menu={{ items: profileMenuItems }}
                    trigger={["click"]}
                    placement="bottomRight"
                    popupRender={menu => (
                        <div className="dropdown">
                            {menu}
                        </div>
                    )}
                >
                    <Avatar
                        size="large"
                        src={getAvatarByIconNumber(iconNumber)}
                        className={"navbar-avatar" + (location.pathname === "/profile" ? " active-logo" : "")}
                    >
                        U
                    </Avatar>
                </Dropdown>

            </div>
        </Header>
    );
};

export default Navbar;
