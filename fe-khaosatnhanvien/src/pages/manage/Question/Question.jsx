import { Table, Button, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getQuestions, deleteQuestion } from '../../../services/questionService';

function Question() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getQuestions();
                const formatted = data.map((item, index) => ({
                    key: index + 1,
                    id: item.id,
                    content: item.content,
                    type: item.questionType,
                    score: item.score,
                }));
                setQuestions(formatted);
            } catch {
                message.error('Không thể tải dữ liệu câu hỏi');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) return;
        try {
            await deleteQuestion(id);
            message.success('Xóa thành công');
            setQuestions((prev) => prev.filter((q) => q.id !== id));
        } catch {
            message.error('Không thể xóa câu hỏi');
        }
    };

    const columns = [
        { title: 'STT', dataIndex: 'key', key: 'key' },
        { title: 'Nội dung', dataIndex: 'content', key: 'content' },
        { title: 'Loại câu hỏi', dataIndex: 'type', key: 'type' },
        { title: 'Điểm', dataIndex: 'score', key: 'score' },
        {
            title: 'Chức năng',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => navigate(`/admin/cauhoi/edit/${record.id}`)}
                    >
                        Sửa
                    </Button>
                    <Button danger icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record.id)}>
                        Xóa
                    </Button>
                    {record.type === 'MultipleChoice' && (
                        <Button
                            type="default"
                            size="small"
                            onClick={() => navigate(`/admin/cauhoi/${record.id}/dapan/add`)}
                        >
                            Thêm đáp án
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                <Button icon={<PlusOutlined />} type="primary" onClick={() => navigate('/admin/cauhoi/add')}>
                    Thêm câu hỏi
                </Button>
            </div>
            <Table dataSource={questions} columns={columns} loading={loading} pagination={false} bordered />
        </div>
    );
}

export default Question;
