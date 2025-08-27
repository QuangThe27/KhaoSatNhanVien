import { Form, Input, Button, Card, message, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createExam } from '../../../services/examService';

function CreateExam() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            await createExam(values);
            message.success('Tạo bài kiểm tra thành công!');
            navigate('/admin/baikiemtra');
        } catch {
            message.error('Không thể tạo bài kiểm tra');
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <Card title="Thêm bài kiểm tra mới">
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Tên bài kiểm tra" name="name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Vị trí công việc" name="jobPosition">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Cấp độ" name="level">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Thời lượng (phút)" name="durationMinutes" rules={[{ required: true }]}>
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default CreateExam;
