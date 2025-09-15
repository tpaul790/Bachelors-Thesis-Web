import {Col, Row} from "antd";

export const ProjectsHeader = () => {
    return (
        <Row align="middle" className="header-row">
            <Col flex="190px">Project Manager</Col>
            <Col flex="170px">Project Name</Col>
            <Col flex="130px">Created</Col>
            <Col flex="140px">Team Name</Col>
            <Col flex="180px">Members</Col>
            <Col flex="40px">Action</Col>
        </Row>
    )
}