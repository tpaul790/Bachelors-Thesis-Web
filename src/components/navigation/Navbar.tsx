import { Avatar, Dropdown, Layout } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import "../../App.css"
import { getRoleFromToken } from "../../utils/functions/token.ts";
import { UserRole } from "../../user/dto/UserDtos.ts";
import { getAvatarByIconNumber } from "../../utils/functions/user.ts";
import { MailOutlined } from "@ant-design/icons";
const { Header } = Layout;

interface IOwnProps {
    iconNumber: number;
    invitationNumber: number;
}

const Navbar = (props: IOwnProps) => {
    const { iconNumber, invitationNumber } = props;
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
                            <Link
                                to="/admin-teams"
                                className={location.pathname === "/admin-teams" ? "active-link" : ""}
                            >
                                Teams
                            </Link>
                            <Link
                                to="/invitations"
                                className={location.pathname === "/invitations" ? "active-link" : ""}
                            >
                                <div className="invitation-icon-content">
                                    <MailOutlined style={{ fontSize: "20px" }} />
                                    {invitationNumber > 0 && <div className="invitation-icon-number">{invitationNumber}</div>}
                                </div>
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
                                to="/user-teams"
                                className={location.pathname === "/user-teams" ? "active-link" : ""}
                            >
                                Teams
                            </Link>
                            <Link
                                to="/invitations"
                                className={location.pathname === "/invitations" ? "active-link" : ""}
                            >
                                <div className="invitation-icon-content">
                                    <MailOutlined style={{ fontSize: "20px" }} />
                                    {invitationNumber > 0 && <div className="invitation-icon-number">{invitationNumber}</div>}
                                </div>
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
