import { Avatar, Dropdown, Layout } from "antd";
import { UserOutlined, LogoutOutlined, TeamOutlined, StockOutlined } from "@ant-design/icons";
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
            label: <Link
                to="/profile"
                className= {(location.pathname === "/profile" ? "active-dropdown-element " : "") + "dropdown-link"}
            >
                <UserOutlined className="dropdown-menu-icon"/>
                View Profile
            </Link>,
        },
        {
            key: "logout",
            icon: <LogoutOutlined className="dropdown-menu-icon"/>,
            label: "Logout",
            onClick: handleLogout,
        },
    ];


    const teamsMenuItems = [
        {
            key: "view-my-team",
            label: <Link
                to="/teams"
                className= {(location.pathname === "/teams" ? "active-dropdown-element " : "") + "dropdown-link"}
            >
                <TeamOutlined className="dropdown-menu-icon"/>
                My Teams
            </Link>,
        },
        {
            key: "view-all-teams",
            label: <Link
                to="/admin-teams"
                className= {(location.pathname === "/admin-teams" ? "active-dropdown-element " : "") + "dropdown-link"}
            >
                <StockOutlined className="dropdown-menu-icon"/>
                All Teams
            </Link>,
            className: location.pathname === "/admin-teams" ? "active-dropdown-element" : "",
        }
    ]

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
                            <Dropdown
                                menu={{ items: teamsMenuItems }}
                                trigger={["click"]}
                                placement="bottomRight"
                                popupRender={menu => (
                                    <div className="dropdown">
                                        {menu}
                                    </div>
                                )}
                            >
                                <Link
                                    to={""}
                                    className={location.pathname === "/teams" || location.pathname === "/admin-teams" ? "active-link" : ""}
                                >
                                    Teams
                                </Link>
                            </Dropdown>
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
                                className={location.pathname === "/teams" ? "active-link" : ""}
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
                    <div className="navbar-avatar-container">
                        <Avatar
                            size="large"
                            src={getAvatarByIconNumber(iconNumber)}
                            className={(location.pathname === "/profile" ? " active-logo " : "") + "navbar-avatar"}
                        >
                            U
                        </Avatar>
                    </div>
                </Dropdown>

            </div>
        </Header>
    );
};

export default Navbar;
