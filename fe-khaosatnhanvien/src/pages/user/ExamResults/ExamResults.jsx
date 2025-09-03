import { useEffect, useState } from 'react';
import { Table, Button, Modal, Spin } from 'antd';
import { getExamResultsByUser } from '../../../services/examResultService';
import { getExamQuestionResultsByExamResultId } from '../../../services/examQuestionResultService';

function ExamResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const [detailVisible, setDetailVisible] = useState(false);
    const [detailData, setDetailData] = useState([]);
    const [loadingDetail, setLoadingDetail] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (!savedUser) return;
        const user = JSON.parse(savedUser);

        getExamResultsByUser(user.id)
            .then((data) => {
                setResults(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleShowDetail = async (examResultId) => {
        setDetailVisible(true);
        setLoadingDetail(true);
        try {
            const data = await getExamQuestionResultsByExamResultId(examResultId);
            setDetailData(data);
        } catch (err) {
            console.error(err);
        }
        setLoadingDetail(false);
    };

    // Cột của bảng danh sách kết quả
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Tên bài thi',
            dataIndex: 'examName',
            key: 'examName',
        },
        {
            title: 'Tổng điểm',
            dataIndex: 'totalScore',
            key: 'totalScore',
        },
        {
            title: 'Bắt đầu',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (val) => new Date(val).toLocaleString(),
        },
        {
            title: 'Kết thúc',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (val) => new Date(val).toLocaleString(),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Button type="link" onClick={() => handleShowDetail(record.id)}>
                    Chi tiết
                </Button>
            ),
        },
    ];

    // Cột của bảng chi tiết
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
            title: 'Câu trả lời',
            key: 'answer',
            render: (_, record) =>
                record.questionType === 'Essay' ? record.essayAnswers : record.answerContent || '(Chưa chọn)',
        },
        {
            title: 'Điểm',
            dataIndex: 'score',
            key: 'score',
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>Kết quả bài kiểm tra</h2>
            <Table rowKey="id" loading={loading} columns={columns} dataSource={results} bordered />

            <Modal
                title="Chi tiết bài làm"
                open={detailVisible}
                onCancel={() => setDetailVisible(false)}
                footer={null}
                width={900}
            >
                {loadingDetail ? (
                    <Spin />
                ) : (
                    <Table rowKey="id" columns={detailColumns} dataSource={detailData} pagination={false} bordered />
                )}
            </Modal>
        </div>
    );
}

export default ExamResults;
