import { Button, Form, Input, Typography, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import './Auth.scss';

const { Title } = Typography;

function Login() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const user = await login(values.Email, values.Password);
            // Lưu user vào localStorage
            localStorage.setItem('user', JSON.stringify(user));
            message.success('Đăng nhập thành công');
            navigate('/'); // quay về trang chủ
        } catch (error) {
            message.error(error.message || 'Đăng nhập thất bại');
        }
    };

    return (
        <div className="auth-container">
            <Card className="auth-card">
                <Title level={2} style={{ textAlign: 'center' }}>
                    Đăng nhập
                </Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="Email" rules={[{ required: true, message: 'Vui lòng nhập Email!' }]}>
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="Password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Login;
