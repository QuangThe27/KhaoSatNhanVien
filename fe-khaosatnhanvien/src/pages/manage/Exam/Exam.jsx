import { Table, Button, Space, message, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getExams, deleteExam } from '../../../services/examService';
import { getQuestionsByExamId, deleteExamQuestion } from '../../../services/examQuestionService';

function Exam() {
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);

    // Modal hiển thị câu hỏi
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);
    const [loadingQuestions, setLoadingQuestions] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getExams();
                const formatted = data.map((item, index) => ({
                    key: index + 1,
                    id: item.id,
                    name: item.name,
                    jobPosition: item.jobPosition,
                    level: item.level,
                    duration: item.durationMinutes,
                }));
                setExams(formatted);
            } catch {
                message.error('Không thể tải dữ liệu bài kiểm tra');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa bài kiểm tra này?')) return;
        try {
            await deleteExam(id);
            message.success('Xóa thành công');
            setExams((prev) => prev.filter((exam) => exam.id !== id));
        } catch {
            message.error('Không thể xóa bài kiểm tra');
        }
    };

    const handleShowQuestions = async (exam) => {
        setSelectedExam(exam);
        setIsModalOpen(true);
        setLoadingQuestions(true);
        try {
            const data = await getQuestionsByExamId(exam.id);
            setQuestions(data);
        } catch {
            message.error('Không thể tải danh sách câu hỏi');
        } finally {
            setLoadingQuestions(false);
        }
    };

    const handleDeleteQuestion = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này khỏi bài kiểm tra?')) return;
        try {
            await deleteExamQuestion(id);
            message.success('Xóa câu hỏi thành công');
            setQuestions((prev) => prev.filter((q) => q.id !== id));
        } catch {
            message.error('Không thể xóa câu hỏi');
        }
    };

    const examColumns = [
        { title: 'STT', dataIndex: 'key', key: 'key' },
        { title: 'Tên bài kiểm tra', dataIndex: 'name', key: 'name' },
        { title: 'Vị trí', dataIndex: 'jobPosition', key: 'jobPosition' },
        { title: 'Cấp độ', dataIndex: 'level', key: 'level' },
        { title: 'Thời lượng (phút)', dataIndex: 'duration', key: 'duration' },
        {
            title: 'Chức năng',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => handleShowQuestions(record)}
                    >
                        Show
                    </Button>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => navigate(`/admin/baikiemtra/edit/${record.id}`)}
                    >
                        Sửa
                    </Button>
                    <Button danger icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record.id)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    const questionColumns = [
        { title: 'ID', dataIndex: ['question', 'id'], key: 'id' },
        { title: 'Nội dung', dataIndex: ['question', 'content'], key: 'content' },
        { title: 'Loại', dataIndex: ['question', 'questionType'], key: 'questionType' },
        { title: 'Điểm', dataIndex: ['question', 'score'], key: 'score' },
        {
            title: 'Chức năng',
            key: 'actions',
            render: (_, record) => (
                <Button danger size="small" onClick={() => handleDeleteQuestion(record.id)}>
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                <Button icon={<PlusOutlined />} type="primary" onClick={() => navigate('/admin/baikiemtra/add')}>
                    Thêm bài kiểm tra
                </Button>
            </div>
            <Table dataSource={exams} columns={examColumns} loading={loading} pagination={false} bordered />

            {/* Modal hiển thị câu hỏi */}
            <Modal
                title={`Danh sách câu hỏi - ${selectedExam?.name}`}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={800}
            >
                <Table
                    dataSource={questions}
                    columns={questionColumns}
                    rowKey="id"
                    loading={loadingQuestions}
                    pagination={false}
                    bordered
                />
            </Modal>
        </div>
    );
}
export default Exam;
