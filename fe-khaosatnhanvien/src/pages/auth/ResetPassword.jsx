import { Form, Input, Button, Card, Typography } from 'antd';
import { resetPassword } from '../../services/authService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/Notification/Notification';

const { Title } = Typography;

function ResetPassword() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);

    const onFinish = async (values) => {
        try {
            await resetPassword(values.Email, values.Token, values.NewPassword);
            setNotification({
                type: 'success',
                message: 'Đổi mật khẩu thành công',
                description: 'Bạn có thể đăng nhập bằng mật khẩu mới.',
            });
            setTimeout(() => navigate('/login'), 1500);
        } catch (error) {
            setNotification({
                type: 'error',
                message: 'Đổi mật khẩu thất bại',
                description: error.message || 'Email hoặc mã xác thực không đúng',
            });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-logo" onClick={() => navigate('/')}>
                <img src="/logo192.png" alt="Logo" />
            </div>
            <Card className="auth-card">
                <Title level={2} style={{ textAlign: 'center' }}>
                    Đặt lại mật khẩu
                </Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="Email" rules={[{ required: true }]}>
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item label="Mã xác thực" name="Token" rules={[{ required: true }]}>
                        <Input placeholder="Mã xác thực 6 ký tự" />
                    </Form.Item>
                    <Form.Item label="Mật khẩu mới" name="NewPassword" rules={[{ required: true }]}>
                        <Input.Password placeholder="Mật khẩu mới" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block htmlType="submit">
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

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

export default ResetPassword;
