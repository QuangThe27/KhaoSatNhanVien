import { useEffect, useState } from 'react';
import { Table, Tag, Typography, message, Spin, Button, Modal, Popconfirm } from 'antd';
import { getAllExamResults, deleteExamResult } from '../../../services/examResultService';
import { getExamQuestionResultsByExamResultId } from '../../../services/examQuestionResultService';

const { Title } = Typography;

const ExamResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [detailVisible, setDetailVisible] = useState(false);
    const [questionResults, setQuestionResults] = useState([]);
    const [detailLoading, setDetailLoading] = useState(false);

    // Load tất cả kết quả
    const fetchResults = async () => {
        try {
            setLoading(true);
            const data = await getAllExamResults();
            setResults(data);
        } catch (error) {
            console.error(error);
            message.error('Không thể tải danh sách kết quả!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    // Xem chi tiết bài kiểm tra
    const handleViewDetail = async (examResultId) => {
        try {
            setDetailLoading(true);
            setDetailVisible(true);
            const data = await getExamQuestionResultsByExamResultId(examResultId);
            setQuestionResults(data);
        } catch (error) {
            console.error(error);
            message.error('Không thể tải chi tiết bài kiểm tra!');
        } finally {
            setDetailLoading(false);
        }
    };

    // Xóa kết quả
    const handleDelete = async (id) => {
        try {
            await deleteExamResult(id);
            message.success('Đã xóa kết quả!');
            fetchResults();
        } catch (error) {
            console.error(error);
            message.error('Không thể xóa kết quả!');
        }
    };

    // Cột bảng kết quả chính
    const columns = [
        {
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
            width: 70,
        },
        {
            title: 'Tên bài kiểm tra',
            dataIndex: 'examName',
            key: 'examName',
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Người làm',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Điểm',
            dataIndex: 'totalScore',
            key: 'totalScore',
            render: (score) => <Tag color={score >= 5 ? 'green' : 'red'}>{score}</Tag>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => handleViewDetail(record.id)} style={{ marginRight: 8 }}>
                        Chi tiết
                    </Button>
                    <Popconfirm
                        title="Xóa kết quả này?"
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button type="link" danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    // Cột bảng chi tiết câu hỏi
    const detailColumns = [
        {
            title: 'Câu hỏi',
            dataIndex: 'questionContent',
            key: 'questionContent',
        },
        {
            title: 'Loại',
            dataIndex: 'questionType',
            key: 'questionType',
        },
        {
            title: 'Đáp án chọn',
            dataIndex: 'answerContent',
            key: 'answerContent',
            render: (text, record) => (record.questionType === 'Essay' ? record.essayAnswers : text),
        },
        {
            title: 'Điểm',
            dataIndex: 'score',
            key: 'score',
            render: (score) => <Tag color={score > 0 ? 'green' : 'red'}>{score}</Tag>,
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <Title level={3}>📊 Quản lý kết quả bài kiểm tra</Title>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px 0' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <Table bordered rowKey="id" dataSource={results} columns={columns} pagination={{ pageSize: 10 }} />
            )}

            {/* Modal chi tiết */}
            <Modal
                open={detailVisible}
                title="Chi tiết bài kiểm tra"
                footer={null}
                onCancel={() => setDetailVisible(false)}
                width={800}
            >
                {detailLoading ? (
                    <Spin size="large" />
                ) : (
                    <Table
                        bordered
                        rowKey="id"
                        dataSource={questionResults}
                        columns={detailColumns}
                        pagination={false}
                    />
                )}
            </Modal>
        </div>
    );
};

export default ExamResults;
