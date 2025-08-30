import { Table, Button, Space, message, Modal, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getQuestions, deleteQuestion } from '../../../services/questionService';
import { getAnswersByQuestionId, deleteAnswer } from '../../../services/answerService';

function Question() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loadingAnswers, setLoadingAnswers] = useState(false);

    // Load danh sách câu hỏi
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

    // Xóa câu hỏi
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

    // Hiển thị đáp án của câu hỏi
    const handleShowAnswers = async (question) => {
        setSelectedQuestion(question);
        setIsModalOpen(true);
        setLoadingAnswers(true);
        try {
            const data = await getAnswersByQuestionId(question.id);
            const formatted = data.map((item, index) => ({
                key: index + 1,
                id: item.id,
                content: item.content,
                isCorrect: item.isCorrect,
            }));
            setAnswers(formatted);
        } catch {
            message.error('Không thể tải danh sách đáp án');
        } finally {
            setLoadingAnswers(false);
        }
    };

    // Xóa đáp án
    const handleDeleteAnswer = async (id) => {
        try {
            await deleteAnswer(id);
            message.success('Xóa đáp án thành công');
            setAnswers((prev) => prev.filter((a) => a.id !== id));
        } catch {
            message.error('Không thể xóa đáp án');
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
                        <>
                            <Button
                                type="primary"
                                icon={<EyeOutlined />}
                                size="small"
                                onClick={() => handleShowAnswers(record)}
                            >
                                Show
                            </Button>
                            <Button
                                type="default"
                                size="small"
                                onClick={() => navigate(`/admin/cauhoi/${record.id}/dapan/add`)}
                            >
                                Thêm đáp án
                            </Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const answerColumns = [
        { title: 'STT', dataIndex: 'key', key: 'key' },
        { title: 'Nội dung đáp án', dataIndex: 'content', key: 'content' },
        {
            title: 'Đúng/Sai',
            dataIndex: 'isCorrect',
            key: 'isCorrect',
            render: (value) => (value ? '✔ Đúng' : '✘ Sai'),
        },
        {
            title: 'Chức năng',
            key: 'actions',
            render: (_, record) => (
                <Popconfirm
                    title="Xóa đáp án"
                    description="Bạn có chắc chắn muốn xóa đáp án này?"
                    onConfirm={() => handleDeleteAnswer(record.id)}
                    okText="Có"
                    cancelText="Không"
                >
                    <Button danger icon={<DeleteOutlined />} size="small">
                        Xóa
                    </Button>
                </Popconfirm>
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

            {/* Modal hiển thị đáp án */}
            <Modal
                title={`Danh sách đáp án - ${selectedQuestion?.content}`}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={800}
            >
                <Table
                    dataSource={answers}
                    columns={answerColumns}
                    rowKey="id"
                    loading={loadingAnswers}
                    pagination={false}
                    bordered
                />
            </Modal>
        </div>
    );
}

export default Question;
