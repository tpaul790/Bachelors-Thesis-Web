import {Avatar, Button, Input, Layout, message, Modal, Spin, Tag} from "antd";
import Descriptions from "antd/es/descriptions";
import { EditOutlined, SaveOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
    avatarIcons,
    Feedback,
    getAvatarByIconNumber
} from "../../../utils/functions/user.ts";
import "./profile.css";
import "../../../App.css"
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../api/store.ts";
import type {UserDto, UserUpdateDto} from "../../dto/UserDtos.ts";
import {useUpdateUserMutation} from "../../api/userQueryApi.ts";
import {setLoggedUser} from "../../../api/userSlice.ts";
import Navbar from "../../../components/navigation/Navbar.tsx";

export const Profile = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editUser, setEditUser] = useState<Partial<UserUpdateDto>>({});
    const [updateUser] = useUpdateUserMutation();
    const [avatarHighlight, setAvatarHighlight] = useState<boolean>(false);
    const [avatarModalOpen, setAvatarModalOpen] = useState<boolean>(false);

    const user = useSelector((state: RootState) => state.loggedUser.user);
    const dispatch = useDispatch();
    const [selectedIcon, setSelectedIcon] = useState<number>(user?.iconNumber || 0);

    useEffect(() => {
        if (user) {
            setSelectedIcon(Number(user.iconNumber));
            if (isEditing) {
                setEditUser(user);
            }
        }
    }, [user, isEditing]);

    const handleChange = (field: keyof typeof editUser, value: string) => {
        setEditUser({ ...editUser, [field]: value });
    };

    const handleSave = async () => {
        if (!user) return;

        const updatedUser = {
            ...editUser,
            id: user.id,
            iconNumber: selectedIcon ?? user.iconNumber
        } as UserUpdateDto;
        try {
            const response: UserDto = await updateUser(updatedUser).unwrap();
            dispatch(setLoggedUser(response));
            message.success(Feedback.SUCCESS);
            setIsEditing(false);
            setAvatarHighlight(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            message.error(Feedback.ERROR);
        }
    };
    return (
        <Layout className="flex-container">
            <Navbar iconNumber={user?.iconNumber ?? 0} />

            <div className="body-profile-user">
                {!user ? (
                    <div className="loading-spinner">
                        <h2>No user found...</h2>
                        <Spin tip="Loading profile..." size="large" />
                    </div>
                ) : (
                    <>
                        <div className="profile-container-user card">
                            <Descriptions
                                title={
                                    <div className="profile-header-user">
                                        <div
                                            onClick={() => isEditing && setAvatarModalOpen(true)}
                                            className="profile-avatar-wrapper"
                                        >
                                            <Avatar
                                                size={80}
                                                className={avatarHighlight ? "avatar-highlight" : ""}
                                                icon={<UserOutlined />}
                                                src={getAvatarByIconNumber(Number(selectedIcon))}
                                            />

                                            {isEditing && (
                                                <span className="change-avatar-text">Click on</span>
                                            )}
                                        </div>
                                        {isEditing ? (
                                            <div className="profile-name-inputs">
                                                <Input
                                                    placeholder="First name"
                                                    value={editUser.firstName}
                                                    onChange={e =>
                                                        handleChange("firstName", e.target.value)
                                                    }
                                                    className="edit-input"
                                                />
                                                <Input
                                                    placeholder="Last name"
                                                    value={editUser.lastName}
                                                    onChange={e =>
                                                        handleChange("lastName", e.target.value)
                                                    }
                                                    className="edit-input"
                                                />
                                            </div>
                                        ) : (
                                            <h2 className="profile-name">
                                                {user.firstName} {user.lastName}
                                            </h2>
                                        )}
                                    </div>
                                }
                                bordered
                                column={1}
                                size="middle"
                                className="profile-descriptions"
                            >
                                <Descriptions.Item
                                    label="Username"
                                    className="profile-name-inputs"
                                >
                                    {isEditing ? (
                                        <Input
                                            value={editUser.username}
                                            onChange={e => handleChange("username", e.target.value)}
                                            className="edit-input"
                                        />
                                    ) : (
                                        user.username
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label="Email"
                                    className="profile-name-inputs"
                                >
                                    {isEditing ? (
                                        <Input
                                            value={editUser.email}
                                            onChange={e => handleChange("email", e.target.value)}
                                            className="edit-input"
                                        />
                                    ) : (
                                        user.email
                                    )}                                </Descriptions.Item>
                                <Descriptions.Item label="Role">
                                    <Tag color="blue">{user.userRole}</Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Last active">
                                    {user.lastActive
                                        ? new Date(user.lastActive).toLocaleString()
                                        : "N/A"}
                                </Descriptions.Item>
                            </Descriptions>
                            <div className="profile-buttons">
                                <Button
                                    type="primary"
                                    icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
                                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                                >
                                    {isEditing ? "Save" : "Edit Profile"}
                                </Button>
                            </div>

                            <Modal
                                title="Choose your avatar"
                                open={avatarModalOpen}
                                onCancel={() => setAvatarModalOpen(false)}
                                onOk={() => setAvatarModalOpen(false)}
                                width={500}
                                className="avatar-modal"
                            >
                                <div className="icon-picker">
                                    {avatarIcons.map(({ src, iconNumber }) => (
                                        <div
                                            key={iconNumber}
                                            className={`icon-option ${
                                                selectedIcon === iconNumber ? "selected" : ""
                                            }`}
                                            onClick={() => {
                                                setSelectedIcon(iconNumber);
                                                setEditUser({ ...editUser, iconNumber });
                                            }}
                                        >
                                            <img src={src} alt={`avatar ${iconNumber}`} />
                                        </div>
                                    ))}
                                </div>
                            </Modal>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}
