import { Form, Input, Button } from "antd";
import "./auth.css";
import "../../App.css"
import { useNavigate } from "react-router-dom";


export function Login() {
    const navigate = useNavigate();

    const onFinish = (values: never) => {
        console.log("Form submitted:", values);
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
                            <Button type="primary" htmlType="submit" className="submit-btn">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
