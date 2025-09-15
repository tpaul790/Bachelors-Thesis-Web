import type {UserDto} from "../../dto/UserDtos.ts";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Col, notification, Popconfirm, Space, Table} from "antd";
import type {ColumnsType} from "antd/es/table";
import "./userList.css"
import {useState} from "react";
import {UpdateUserModal} from "./UpdateUserModal.tsx";
import {useDeleteUserMutation} from "../../api/userQueryApi.ts";

interface IOwnProps{
    users: UserDto[];
}

export const UserListTable = (props: IOwnProps) => {
    const {users} = props;
    const [updateUserModalOpen, setUpdateUserModalOpen] = useState<boolean>(false);
    const [userToUpdate, setUserToUpdate] = useState<UserDto | undefined>(undefined);
    const [ deleteUser ] = useDeleteUserMutation();

    const handleDelete = async (id: number) => {
        try{
            await deleteUser(id).unwrap();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        const errorMessage =
            err?.data?.error || err?.message || "An unknown error occurred";
        notification.error({
            message: "Delete User Error",
            description: errorMessage,
            placement: "top",
            duration: 3,
        })
    }
    };

    const handleUpdate = (user: UserDto) => {
        setUpdateUserModalOpen(true);
        setUserToUpdate(user);
    };

    const columns : ColumnsType<UserDto> = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
            title: "Role",
            dataIndex: "userRole",
            key: "userRole",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },

        {
            title: "Actions",
            key: "actions",
            render: (_: UserDto, user: UserDto) => (
                <Space className="col-actions">
                    <EditOutlined
                        onClick={() => handleUpdate(user)}
                        className="icon-action"
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this account?"
                        onConfirm={() => handleDelete(user.id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ danger: true }}
                    >
                        <Col className="col-action" flex="20px">
                            <DeleteOutlined className="icon-action" />
                        </Col>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return(
        <>
            <Table
                className="user-list-table"
                dataSource={users.map((u) => ({ ...u, key: u.id }))}
                columns={columns}
                pagination={{
                    defaultPageSize: 9,
                    pageSize: 9,
                }}
            />

            {userToUpdate && updateUserModalOpen &&
                <UpdateUserModal
                    user={userToUpdate}
                    isOpen={updateUserModalOpen}
                    setIsOpen={setUpdateUserModalOpen}
                />
            }
        </>
    )
}