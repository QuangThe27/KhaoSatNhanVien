import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form, Input, Checkbox, message } from 'antd';
import { createAnswer } from '../../../services/answerService';

function AnswerAdd() {
    const { id } = useParams(); // Lấy questionId từ URL
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            await createAnswer({
                questionId: parseInt(id),
                content: values.content,
                isCorrect: values.isCorrect || false,
            });
            message.success('Thêm đáp án thành công');
            navigate(`/admin/cauhoi`); // quay về danh sách câu hỏi
        } catch (err) {
            message.error(err.message || 'Không thể thêm đáp án');
        }
    };

    return (
        <div style={{ padding: '24px', display: 'flex', justifyContent: 'center' }}>
            <Card title="Thêm đáp án trắc nghiệm" style={{ width: 600 }}>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Nội dung đáp án"
                        name="content"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung đáp án' }]}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Form.Item name="isCorrect" valuePropName="checked">
                        <Checkbox>Đáp án đúng</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => navigate(-1)}>
                            Hủy
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default AnswerAdd;
