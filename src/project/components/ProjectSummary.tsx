import {Content} from "antd/es/layout/layout";
import {Avatar, Card, Col, notification, Popconfirm, Row, Space, Typography} from "antd";
import type {ProjectSummaryDto} from "../dto/ProjectDto.ts";
import {
    CalendarOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import {getDaysAgo} from "../../utils/functions/date.ts";
import {getAvatarByIconNumber} from "../../utils/functions/user.ts";
const { Title, Text } = Typography;
import "./css/projectSummary.css"
import {useDeleteProjectMutation} from "../api/projectQueryApi.ts";
import {MemberRole} from "../../member/dto/MemberDto.ts";
import {useState} from "react";
import {ExtraProjectSummaryContent} from "./ExtraProjectSummaryContent.tsx";

const MAX_VISIBLE_PARTICIPANTS = 4;

interface IOwnProps{
    project: ProjectSummaryDto;
    handleAfterDeleteProject: () => void;
}

export const ProjectSummary = (props: IOwnProps) => {
    const [deleteProject] = useDeleteProjectMutation();
    const [expanded, setExpanded] = useState<boolean>(false);
    const {project, handleAfterDeleteProject} = props;
    const {
        id: projectId,
        name,
        createdAt,
        team
    } = project;
    const {
        name: teamName,
        members
    } = team;
    const icons = members
        .map(m => m.user.iconNumber);
    const manager = members.find(m => m.role === MemberRole.MANAGER);
    const hasIcons = icons !== undefined;
    const visibleParticipants = hasIcons
        ? icons.slice(0, MAX_VISIBLE_PARTICIPANTS)
        : [];
    const extraCount = hasIcons ? icons.length - MAX_VISIBLE_PARTICIPANTS : 0;

    const handleDeleteProject = async (id: number) => {
        try {
            await deleteProject(id).unwrap();
            handleAfterDeleteProject();
            notification.success({
                message: "Successfully Delete",
                description: "Project successfully removed",
                placement: "top",
                duration: 3,
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(err: any){
            const errorMessage =
                err?.data?.error || err?.message || "An unknown error occurred";
            notification.error({
                message: "Delete Project Error",
                description: errorMessage,
                placement: "top",
                duration: 3,
            })
        }
    };

    const isProjectsPage =() => {
        return location.pathname === "/projects";
    }

    return (
        <>
            <Content className="summary-content">
                <Card
                    className={`summary-card ${expanded ? "expanded-card" : ""} ${isProjectsPage() ? "clickable-card" : ""} ${!isProjectsPage() ? "hoverable-card" : ""}`}
                    onClick={() => setExpanded(!expanded)}
                >
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
                        <Col flex="140px">
                            <Title level={5} className="summary-title">
                                {name}
                            </Title>
                        </Col>

                        <Col flex="170px">
                            <Space size="small">
                                <CalendarOutlined className="icon-calendar" />
                                <Text className="summary-text">
                                    {createdAt ? getDaysAgo(new Date(createdAt)) : "Not specified"}
                                </Text>
                            </Space>
                        </Col>

                        <Col flex="140px">
                            <Title level={5} className="summary-title">
                                {teamName}
                            </Title>
                        </Col>

                        <Col flex="200px">
                            <Content className="avatar-group">
                                {visibleParticipants.map((icon, index) => (
                                    <Avatar
                                        key={index}
                                        className="avatar-icon"
                                        size="large"
                                        src={getAvatarByIconNumber(icon)}
                                        style={{
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
                        </Col>

                        <Popconfirm
                            title="Are you sure you want to delete this project?"
                            onConfirm={() => handleDeleteProject(projectId)}
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{ danger: true }}
                        >
                            <Col className="col-action" flex="20px">
                                <DeleteOutlined className="icon-action" />
                            </Col>
                        </Popconfirm>
                    </Row>
                    {expanded && isProjectsPage() && <ExtraProjectSummaryContent project={project}/>}
                </Card>
            </Content>
        </>
    );
}