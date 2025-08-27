import { Form, Input, Button, Card, message, InputNumber, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getQuestionById, updateQuestion } from '../../../services/questionService';

function EditQuestion() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getQuestionById(id);
                form.setFieldsValue(data);
            } catch {
                message.error('Lỗi khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, form]);

    const onFinish = async (values) => {
        try {
            await updateQuestion(id, values);
            message.success('Cập nhật thành công!');
            navigate('/admin/cauhoi');
        } catch {
            message.error('Không thể cập nhật');
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <Card title="Chỉnh sửa câu hỏi">
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
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default EditQuestion;
