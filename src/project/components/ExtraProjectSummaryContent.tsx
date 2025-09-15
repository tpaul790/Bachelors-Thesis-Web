import {Col, Row, Typography} from "antd";
import type {ProjectSummaryDto} from "../dto/ProjectDto.ts";
import {MemberSummary} from "../../member/components/MemberSummary.tsx";
const { Title } = Typography;


interface IOwnProps {
    project: ProjectSummaryDto;
}

export const ExtraProjectSummaryContent = (props: IOwnProps)  => {
    const { project } = props;
    const {
        description,
        team: { members }
    } = project;

    return (
        <>
            <Row align="middle" className="summary-row">
                <Col flex="auto">
                    <Title level={5} className="summary-title">
                        Project Description:
                    </Title>
                    <span className="project-description">{description}</span>
                </Col>
            </Row>
            <Row align="middle" className="summary-row">
                <Col flex="auto">
                    <Title level={5} className="summary-title">
                        Members:
                    </Title>
                    <Row align="middle" className="members-row">
                        {members.map(m => (
                            <Col key={m.user.id} className="member-col">
                                <MemberSummary member={m} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    )
}