import type { TeamSummaryDto} from "../dto/TeamDto.ts";
import {Content} from "antd/es/layout/layout";
import {Avatar, Card, Col, Popconfirm, Row, Space, Typography} from "antd";
import {CalendarOutlined, DeleteOutlined, LogoutOutlined,UserAddOutlined} from "@ant-design/icons";
import {getDaysAgo} from "../../utils/functions/date.ts";
import {getAvatarByIconNumber} from "../../utils/functions/user.ts";
import {MemberRole} from "../../member/dto/MemberDto.ts";
const { Title, Text } = Typography;
import "./teamSummary.css"
import "../../App.css"
import {removeTeam} from "../utils/Functions.ts";
import {useDeleteTeamMutation} from "../api/teamQueryApi.ts";
import {removeMember} from "../../member/utils/Functions.ts";
import {useDeleteMemberMutation} from "../../member/api/memberQueryApi.ts";

const MAX_VISIBLE_MEMBERS= 4;

interface IOwnProps {
    userId: number;
    team: TeamSummaryDto;
    handleAfterDeleteTeam: () => void;
}

export const TeamSummary = (props: IOwnProps) => {
    const { userId, team, handleAfterDeleteTeam } = props;
    const { id: teamid, name: teamName, members, createdAt}  = team;

    const icons = members.
        filter(m => m.role === MemberRole.DEVELOPER)
        .map(m => m.user.iconNumber);
    const manager = members.find(member => member.role === MemberRole.MANAGER);
    const myMemberId = members.find(m => m.user.id === userId)?.id;

    const hasIcons = icons !== undefined;
    const visibleMembers = hasIcons
        ? icons.slice(0, MAX_VISIBLE_MEMBERS)
        : [];
    const extraCount = hasIcons ? icons.length - MAX_VISIBLE_MEMBERS : 0;
    const [ deleteTeam ] = useDeleteTeamMutation();
    const [ deleteMember ] = useDeleteMemberMutation();

    const handleDeleteTeam = async () => {
        await removeTeam(teamid, deleteTeam);
        handleAfterDeleteTeam();
    }

    const handleLeaveTeam = async () => {
        if(myMemberId) {
            await removeMember(myMemberId, deleteMember);
        }
    }

    const isAdminPage = () => {
        return location.pathname === "/admin-teams";
    }

    return (
        <>
            <Content className="summary-content">
                <Card className="summary-card">
                    <Row align="middle" className="summary-row">
                        <Col className="col-manager-avatar" flex="220px">
                            <Avatar
                                className="manager-avatar"
                                size="large"
                                src={getAvatarByIconNumber(manager?.user.iconNumber ?? 0)}
                                style={{
                                    backgroundColor: getAvatarByIconNumber(manager?.user.iconNumber ?? 0)
                                        ? undefined
                                        : "#7265e6",
                                }}
                            ></Avatar>
                            <div className="project-manager-names">
                                <span className="summary-text">{manager?.user.firstName}</span>
                                <span className="summary-text">{manager?.user.lastName}</span>
                            </div>
                        </Col>

                        <Col className="col-date" flex="180px">
                            <Space size="small">
                                <CalendarOutlined className="icon-calendar" />
                                <Text className="summary-text">
                                    {createdAt ? getDaysAgo(new Date(createdAt)) : "Not specified"}
                                </Text>
                            </Space>
                        </Col>

                        <Col flex="150px">
                            <Title level={5} className="summary-title">
                                {teamName}
                            </Title>
                        </Col>

                        <Col className="col-participants" flex="200px">
                            {visibleMembers.length === 0 ? (
                                <Text className="summary-text">
                                    No Dev's Available
                                </Text>
                            ) : (
                                <Content className="avatar-group">
                                    {visibleMembers.map((icon, index) => (
                                        <Avatar
                                            key={index}
                                            className="avatar-icon"
                                            size="large"
                                            src={getAvatarByIconNumber(icon)}
                                            style={{
                                                backgroundColor: getAvatarByIconNumber(icon)
                                                    ? undefined
                                                    : "#7265e6",
                                                zIndex: icons.length - index,
                                                marginLeft: index === 0 ? 0 : -8
                                            }}
                                        ></Avatar>
                                    ))}
                                    {extraCount > 0 && (
                                        <Avatar size="large" className="avatar-extra-icon">
                                            +{extraCount}
                                        </Avatar>
                                    )}
                                </Content>
                            )}
                        </Col>
                            {isAdminPage() ? (
                                <Col className="flex-container">
                                    <Popconfirm
                                        title="Are you sure you want to delete this team?"
                                        onConfirm={() => handleDeleteTeam()}
                                        okText="Yes"
                                        cancelText="No"
                                        okButtonProps={{ danger: true }}
                                    >
                                        <Col className="col-action" flex="20px">
                                            <DeleteOutlined className="icon-action" />
                                        </Col>
                                    </Popconfirm>
                                </Col>
                            ) : (
                                <Col className={manager?.user.id === userId ? "col-actions" : "flex-container" } flex="60px">
                                    {manager?.user.id === userId ?
                                        (<>
                                            <Col className="col-action">
                                                <UserAddOutlined className="icon-action" />
                                            </Col>
                                            <Popconfirm
                                                title="Are you sure you want to delete this team?"
                                                onConfirm={() => handleDeleteTeam()}
                                                okText="Yes"
                                                cancelText="No"
                                                okButtonProps={{ danger: true }}
                                            >
                                                <Col className="col-action" flex="20px">
                                                    <DeleteOutlined className="icon-action" />
                                                </Col>
                                            </Popconfirm>
                                        </>) :
                                        (<Popconfirm
                                            title="Are you sure you want to leave this team?"
                                            onConfirm={() => handleLeaveTeam()}
                                            okText="Yes"
                                            cancelText="No"
                                            okButtonProps={{ danger: true }}
                                        >
                                            <Col className="col-action" flex="20px">
                                                <LogoutOutlined className="icon-action" />
                                            </Col>
                                        </Popconfirm>)
                                    }
                                </Col>
                                )
                            }
                    </Row>
                </Card>
            </Content>
        </>
    );
}