import {Form, Input, Button, type FormProps, notification} from "antd";
import "./auth.css";
import "../../App.css"
import {useNavigate} from "react-router-dom";
import {useRegisterMutation} from "../api/authQueryApi.ts";


type FieldType = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}

export function Register() {
    const [register, {isLoading}] = useRegisterMutation();
    const navigate = useNavigate();
    const [form] = Form.useForm<FieldType>();

    const onFinish: FormProps<FieldType>["onFinish"] = async values => {
        const registerRequest = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            username: values.username,
            password: values.password,
            iconNumber: 0
        }

        try{
            await register(registerRequest);

            form.resetFields();

            notification.success({
                message: "Login Error",
                description: "Account successfully created",
                placement: "top",
                duration: 3,
            });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(err: any){
            const errorMessage =
                err?.data?.error || err?.message || "An unknown error occurred";

            notification.error({
                message: "Login Error",
                description: errorMessage,
                placement: "top",
                duration: 3,
            });
        }
    };

    return (
        <div className={"flex-container"}>
            <div className="auth-container">
                <div className="auth-left">
                    <div className="auth-logo">Synergy</div>
                    <div className="auth-image-text">
                        <h3>Manage tasks, master time.</h3>
                    </div>
                </div>

                <div className="auth-right">
                    <h2>Create an account</h2>
                    <p>
                        Already have an account?
                        <Button type="default"
                                className="auth-link"
                                onClick={() => navigate("/")}
                        >
                            Log in
                        </Button>
                    </p>

                    <Form
                        name="register"
                        layout="vertical"
                        onFinish={onFinish}
                        className="auth-form"
                        form={form}
                    >
                        {/*first and last name*/}
                            <Form.Item
                                name="firstName"
                                rules={[{ required: true, message: "Please enter your first name" }]}
                                style={{ flex: 1 }}
                            >
                                <Input placeholder="First name" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="lastName"
                                rules={[{ required: true, message: "Please enter your last name" }]}
                                style={{ flex: 1 }}
                            >
                                <Input placeholder="Last name" size="large"/>
                            </Form.Item>

                        {/*email*/}
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: "Please enter your email" },
                                { type: "email", message: "Enter a valid email" },
                            ]}
                        >
                            <Input placeholder="Email" size="large"/>
                        </Form.Item>

                        {/*username and password*/}
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: "Please enter your username" }]}
                            style={{ flex: 1 }}
                        >
                            <Input placeholder="Username" size="large"/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Please enter your password" }]}
                            style={{ flex: 1 }}
                        >
                            <Input.Password placeholder="Password" size="large"/>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="submit-btn"
                                loading={isLoading}
                            >
                                Create account
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
