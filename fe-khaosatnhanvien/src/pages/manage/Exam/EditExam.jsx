import { Form, Input, Button, Card, message, InputNumber } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getExamById, updateExam } from '../../../services/examService';

function EditExam() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getExamById(id);
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
            await updateExam(id, values);
            message.success('Cập nhật thành công!');
            navigate('/admin/baikiemtra');
        } catch {
            message.error('Không thể cập nhật');
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <Card title="Chỉnh sửa bài kiểm tra">
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
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default EditExam;
