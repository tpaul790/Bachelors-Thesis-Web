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
import "./projectSummary.css"
import {useDeleteProjectMutation} from "../api/projectQueryApi.ts";

const MAX_VISIBLE_PARTICIPANTS = 4;

interface IOwnProps{
    project: ProjectSummaryDto;
}

export const ProjectSummary = (props: IOwnProps) => {
    const [deleteProject] = useDeleteProjectMutation();
    const {project} = props;
    const {
        id: projectId,
        name,
        createdAt,
        team
    } = project;
    const { icons, name: teamName}  = team;
    const hasIcons = icons !== undefined;
    const visibleParticipants = hasIcons
        ? icons.slice(0, MAX_VISIBLE_PARTICIPANTS)
        : [];
    const extraCount = hasIcons ? icons.length - MAX_VISIBLE_PARTICIPANTS : 0;

    const handleDeleteProject = async (id: number) => {
        try {
            await deleteProject(id).unwrap();
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

    return (
        <>
            <Content className="summary-content">
                <Card className="summary-card hoverable-card">
                    <Row align="middle" className="summary-row">
                        <Col className="col-session-name" flex="180px">
                            <Title level={5} className="summary-title">
                                {name}
                            </Title>
                        </Col>

                        <Col className="col-date" flex="180px">
                            <Space size="small">
                                <CalendarOutlined className="icon-calendar" />
                                <Text className="summary-text">
                                    {createdAt ? getDaysAgo(new Date(createdAt)) : "Not specified"}
                                </Text>
                            </Space>
                        </Col>

                        <Col className="col-session-name" flex="150px">
                            <Title level={5} className="summary-title">
                                {teamName}
                            </Title>
                        </Col>

                        <Col className="col-participants" flex="200px">
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
                </Card>
            </Content>
        </>
    );
}