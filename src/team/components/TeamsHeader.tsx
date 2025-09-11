import {Col, Row} from "antd";

export const TeamsHeader = () => {
    return (
        <Row align="middle" className="teams-header-row">
            <Col flex="220px">Team Manager</Col>
            <Col flex="180px">Created</Col>
            <Col flex="150px">Team Name</Col>
            <Col flex="170px">Developers</Col>
            <Col flex="60px">{location.pathname === "/admin-teams" ? "Action" : "Actions"}</Col>
        </Row>
    )
}