import { Button, Form, Input, Typography, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Auth.scss';

const { Title } = Typography;

function Login() {
    return (
        <div className="auth-container">
            <Card className="auth-card">
                <Title level={2} style={{ textAlign: 'center' }}>
                    Đăng nhập
                </Title>
                <Form layout="vertical">
                    <Form.Item label="Email" name="Email" rules={[{ required: true, message: 'Vui lòng nhập Email!' }]}>
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="PasswordHash"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Login;
