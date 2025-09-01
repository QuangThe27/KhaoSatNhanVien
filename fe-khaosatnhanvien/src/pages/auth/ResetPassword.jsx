import { Form, Input, Button, Card, Typography, message } from 'antd';
import { resetPassword } from '../../services/authService';

const { Title } = Typography;

function ResetPassword() {
    const onFinish = async (values) => {
        try {
            await resetPassword(values.Email, values.Token, values.NewPassword);
            message.success('Đổi mật khẩu thành công, vui lòng đăng nhập lại');
            window.location.href = '/login';
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div className="auth-container">
            <Card className="auth-card">
                <Title level={2} style={{ textAlign: 'center' }}>
                    Đặt lại mật khẩu
                </Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="Email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mã xác thực" name="Token" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mật khẩu mới" name="NewPassword" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block htmlType="submit">
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default ResetPassword;
