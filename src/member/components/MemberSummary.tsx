import type {MemberSummaryDto} from "../dto/MemberDto.ts";
import {Avatar, Col} from "antd";
import {getAvatarByIconNumber} from "../../utils/functions/user.ts";
import "./memberSummary.css"

interface IOwnProps{
    member: MemberSummaryDto;
}

export const MemberSummary = (props: IOwnProps) => {
    const { member } = props;

    return (
        <Col className="col-member-avatar" flex="200px">
            <Avatar
                className="member-avatar"
                size="large"
                src={getAvatarByIconNumber(member?.user.iconNumber ?? 0)}
                style={{
                    backgroundColor: getAvatarByIconNumber(member?.user.iconNumber ?? 0)
                        ? undefined
                        : "#7265e6",
                }}
            ></Avatar>
            <div className="project-member-names">
                <span className="summary-small-text">{member?.user.firstName}</span>
                <span className="summary-small-text">{member?.user.lastName}</span>
            </div>
        </Col>
    )


}