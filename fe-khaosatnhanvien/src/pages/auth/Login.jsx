import { Button, Form, Input, Typography, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../services/authService';
import Notification from '../../components/Notification/Notification';
import './Auth.scss';

const { Title } = Typography;

function Login() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);

    const onFinish = async (values) => {
        try {
            const user = await login(values.Email, values.Password);
            localStorage.setItem('user', JSON.stringify(user));

            setNotification({
                type: 'success',
                message: 'Đăng nhập thành công',
                description: `Chào mừng ${user.FullName || ''}!`,
            });

            setTimeout(() => navigate('/'), 1000);
        } catch (error) {
            setNotification({
                type: 'error',
                message: 'Đăng nhập thất bại',
                description: error.message || 'Sai email hoặc mật khẩu',
            });
        }
    };

    return (
        <div className="auth-container">
            {/* Logo */}
            <div className="auth-logo" onClick={() => navigate('/')}>
                <img src="/logo192.png" alt="Logo" />
            </div>

            <Card className="auth-card">
                <Title level={2} style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    Đăng nhập
                </Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="Email" rules={[{ required: true, message: 'Vui lòng nhập Email!' }]}>
                        <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="Password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block htmlType="submit" size="large">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                {/* Link quên mật khẩu */}
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <Link to="/forgot-password">Quên mật khẩu?</Link>
                </div>
            </Card>

            {/* Notification */}
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    description={notification.description}
                    duration={3500}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
}

export default Login;
