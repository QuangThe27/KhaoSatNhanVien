import { Form, Input, Button, Card, Typography } from 'antd';
import { forgotPassword } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Notification from '../../components/Notification/Notification';

const { Title } = Typography;

function ForgotPassword() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);

    const onFinish = async (values) => {
        try {
            await forgotPassword(values.Email);
            setNotification({
                type: 'success',
                message: 'Gửi mã thành công',
                description: 'Mã xác thực đã được gửi về email của bạn.',
            });
            setTimeout(() => (window.location.href = '/reset-password'), 1500);
        } catch (error) {
            setNotification({
                type: 'error',
                message: 'Gửi mã thất bại',
                description: error.message || 'Email không tồn tại',
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
                    Quên mật khẩu
                </Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="Email" rules={[{ required: true, message: 'Vui lòng nhập Email!' }]}>
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block htmlType="submit">
                            Gửi mã xác thực
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

export default ForgotPassword;
