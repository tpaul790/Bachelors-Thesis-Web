import {type UserDto, UserRole, type UserUpdateDto} from "../../dto/UserDtos.ts";
import {Form, type FormProps, Input, Modal, notification, Select} from "antd";
import {useUpdateAdminMutation} from "../../api/userQueryApi.ts";

interface IOwnProps {
    user: UserDto;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

type FieldType = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    role: UserRole;
    email: string;
}

export const UpdateUserModal = (props: IOwnProps)=> {
    const { user, isOpen, setIsOpen } = props;
    const [form] = Form.useForm<FieldType>();
    const [ updateUser ] = useUpdateAdminMutation();

    const toggleModal = () => {
        setIsOpen(!isOpen);
        form.resetFields();
    }

    const onFinish: FormProps<FieldType>["onFinish"] = async values => {
        const user : UserUpdateDto = {...values, userRole: values.role}
        console.log(values);
        try{
            await updateUser(user).unwrap();
            toggleModal();
            notification.success({
                message: "Successfully Updated",
                description: "User data successfully changed",
                placement: "top",
                duration: 3,
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const errorMessage =
                err?.data?.error || err?.message || "An unknown error occurred";
            form.resetFields();
            notification.error({
                message: "Update User Error",
                description: errorMessage,
                placement: "top",
                duration: 3,
            })
        }
    }

    return(
        <Modal
            title="Update user"
            open={isOpen}
            onCancel={() => toggleModal()}
            width={500}
            classNames={{
                body: "my-modal-body",
                header: "my-modal-header",
                footer: "my-modal-footer",
                content: "my-modal-content",
            }}
            okText="Update"
            okButtonProps={{
                form: "updateUserForm",
                htmlType: "submit",
            }}
        >
            <Form
                id="updateUserForm"
                name="updateTeam"
                layout="vertical"
                onFinish={onFinish}
                form={form}
                initialValues={{
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    role: user.userRole,
                }}
            >
                <Form.Item name="id" noStyle>
                    <Input type="hidden" />
                </Form.Item>

                <Form.Item
                    name="firstName"
                    rules={[
                        { pattern: /^[A-Za-z][A-Za-z0-9 ]*$/, message: "First name should start with a letter" },
                    ]}
                >
                    <Input placeholder="First Name" size="large" />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    rules={[
                        { pattern: /^[A-Za-z][A-Za-z0-9 ]*$/, message: "Last name should start with a letter" },
                    ]}
                >
                    <Input placeholder="Last Name" size="large" />
                </Form.Item>

                <Form.Item
                    name="username"
                    rules={[
                        { min: 4, message: "Username should be at least 4 characters long" },
                        { pattern: /^[A-Za-z][A-Za-z0-9 ]*$/, message: "Username should start with a letter" },
                    ]}
                >
                    <Input placeholder="Username" size="large" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        { type: "email", message: "Please enter a valid email address" },
                    ]}
                >
                    <Input placeholder="Email" size="large" />
                </Form.Item>

                <Form.Item name="role">
                    <Select
                        placeholder="Role"
                        size="large"
                        className="my-select"
                    >
                        <Select.Option value={UserRole.USER}>USER</Select.Option>
                        <Select.Option value={UserRole.ADMIN}>ADMIN</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}