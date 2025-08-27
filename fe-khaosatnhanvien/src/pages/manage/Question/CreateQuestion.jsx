import { Form, Input, Button, Card, message, InputNumber, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../../../services/questionService';

function CreateQuestion() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            await createQuestion(values);
            message.success('Tạo câu hỏi thành công!');
            navigate('/admin/cauhoi');
        } catch {
            message.error('Không thể tạo câu hỏi');
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <Card title="Thêm câu hỏi mới">
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Nội dung câu hỏi" name="content" rules={[{ required: true }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Loại câu hỏi" name="questionType" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="Essay">Tự luận</Select.Option>
                            <Select.Option value="MultipleChoice">Trắc nghiệm</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Điểm" name="score" rules={[{ required: true }]}>
                        <InputNumber min={0} step={0.5} />
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

export default CreateQuestion;
