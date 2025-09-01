import { Form, Input, Button, Card, Typography, message } from 'antd';
import { forgotPassword } from '../../services/authService';

const { Title } = Typography;

function ForgotPassword() {
    const onFinish = async (values) => {
        try {
            await forgotPassword(values.Email);
            message.success('Mã xác thực đã được gửi về email');
            window.location.href = '/reset-password'; // chuyển sang trang reset
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div className="auth-container">
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
        </div>
    );
}

export default ForgotPassword;
