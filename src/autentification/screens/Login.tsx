import {Form, Input, Button, type FormProps, notification} from "antd";
import "./auth.css";
import "../../App.css"
import { useNavigate } from "react-router-dom";
import type {LoginRequest, LoginResponse} from "../dto/AuthDtos.ts";
import {useLoginMutation} from "../api/authQueryApi.ts";
import {isAdmin} from "../../utils/functions/user.ts";

type FieldType = {
    username: string;
    password: string;
};

export function Login() {
    const [login, {isLoading}] = useLoginMutation();
    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>["onFinish"] = async values => {
        const loginRequest: LoginRequest = {username: values.username, password: values.password};

        try{
            const loginResponse: LoginResponse = await login(loginRequest).unwrap();
            const tokenDetails = JSON.parse(atob(loginResponse.token.split('.')[1]));

            if(isAdmin(tokenDetails.role)){
                navigate("/admin-dashboard");
            }else{
                navigate("/user-dashboard");
            }

            notification.success({
                message: "Login Success",
                description: "You are an " + tokenDetails.role,
                placement: "top",
                duration: 3,
            })

            localStorage.setItem("token", loginResponse.token);
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
                    <h2>Log in</h2>
                    <p>
                        Don't have an account?
                        <Button type="default"
                                className="auth-link"
                                onClick={() => navigate("/register")}
                        >
                            Sign Up
                        </Button>
                    </p>

                    <Form
                        name="register"
                        layout="vertical"
                        onFinish={onFinish}
                        className="auth-form"
                    >
                        {/*username and password*/}
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: "Please enter your username" }]}
                            style={{ flex: 1 }}
                        >
                            <Input placeholder="Username" size={"large"}/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Please enter your password" }]}
                                style={{ flex: 1 }}
                        >
                            <Input.Password placeholder="Password" size={"large"} />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="submit-btn"
                                loading={isLoading}
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
