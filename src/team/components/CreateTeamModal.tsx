import {Form, type FormProps, Input, Modal, notification} from "antd";
import "../../App.css"
import {createTeam} from "../utils/Functions.ts";
import {useSaveTeamMutation} from "../api/teamQueryApi.ts";
import {addMember} from "../../member/utils/Functions.ts";
import {useSaveMemberMutation} from "../../member/api/memberQueryApi.ts";
interface IOwnProps{
    userId: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

type FieldType = {
    name: string;
}

export const CreateTeamModal = (props: IOwnProps) => {
    const { isOpen, setIsOpen, userId} = props;
    const [form] = Form.useForm<FieldType>();
    const [ saveTeam ] = useSaveTeamMutation();
    const [ saveMember ] = useSaveMemberMutation();

    const toggleModal = () => {
        setIsOpen(!isOpen);
        form.resetFields();
    }

    const onFinish: FormProps<FieldType>["onFinish"] = async values => {
        const teamId = await createTeam(values.name, saveTeam);
        if(teamId && userId !== 0){
            await addMember(teamId, userId, saveMember);
            toggleModal();
            notification.success({
                message: "Successfully Save",
                description: "Team successfully created",
                placement: "top",
                duration: 3,
            });
        }
    }

    return (
        <Modal
            title="Create a new team"
            open={isOpen}
            onCancel={() => toggleModal()}
            width={500}
            classNames={{
                body: "my-modal-body",
                header: "my-modal-header",
                footer: "my-modal-footer",
                content: "my-modal-content",
            }}
            okText="Create"
            okButtonProps={{
                form: "createTeamForm",
                htmlType: "submit",
            }}
        >
            <Form
                id="createTeamForm"
                name="createTeam"
                layout="vertical"
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name="name"
                    rules={[
                        { required: true, message: "Please enter the team name" },
                        { pattern: /^[A-Za-z][A-Za-z0-9 ]*$/, message: "The team name should start with a letter" },
                    ]}
                >
                    <Input placeholder="Team Name" size="large" />
                </Form.Item>
            </Form>
        </Modal>
    )
}