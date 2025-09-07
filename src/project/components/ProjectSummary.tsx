import {Content} from "antd/es/layout/layout";
import {Avatar, Card, Col, Popconfirm, Row, Space, Typography} from "antd";
import type {ProjectSummaryDto} from "../dto/ProjectDto.ts";
import {
    CalendarOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import {getDaysAgo} from "../../utils/functions/date.ts";
import {getAvatarByIconNumber} from "../../utils/functions/user.ts";
const { Title, Text } = Typography;

const MAX_VISIBLE_PARTICIPANTS = 4;

interface IOwnProps{
    project: ProjectSummaryDto;
}

export const ProjectSummary = (props: IOwnProps) => {
    const {project} = props;
    const {
        id: projectId,
        name,
        createdAt,
        team
    } = project;
    const icons = team ? team.icons : [];
    const hasIcons = icons !== undefined;
    const visibleParticipants = hasIcons
        ? icons.slice(0, MAX_VISIBLE_PARTICIPANTS)
        : [];
    const extraCount = hasIcons ? icons.length - MAX_VISIBLE_PARTICIPANTS : 0;

    const handleDeleteProject = async (id: number) => {
        try {
            // await deleteProject(id).unwrap();
            console.log(id);
        } catch (e) {
            console.error("Error while deleting the session: ", e);
        }
    };

    return (
        <>
            <Content className="admin-session-summary-content">
                <Card className="admin-session-summary-card">
                    <Row align="middle" className="admin-session-summary-row">
                        <Col className="col-session-name" flex="130px">
                            <Title level={5} className="admin-session-summary-title">
                                {name}
                            </Title>
                        </Col>

                        <Col className="col-date" flex="120px">
                            <Space size="small">
                                <CalendarOutlined className="icon-calendar" />
                                <Text className="admin-session-summary-text">
                                    {createdAt ?? getDaysAgo(new Date(createdAt))}
                                </Text>
                            </Space>
                        </Col>

                        <Col className="col-participants" flex="120px">
                            <Content className="avatar-group">
                                {visibleParticipants.map((icon, index) => (
                                    <Avatar
                                        key={index}
                                        className="avatar-icon"
                                        size="small"
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
                                    <Avatar size="small" className="avatar-extra-icon">
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