import { Table, Button, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getExams, deleteExam } from '../../../services/examService';

function Exam() {
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const columns = [
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

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                <Button icon={<PlusOutlined />} type="primary" onClick={() => navigate('/admin/baikiemtra/add')}>
                    Thêm bài kiểm tra
                </Button>
            </div>
            <Table dataSource={exams} columns={columns} loading={loading} pagination={false} bordered />
        </div>
    );
}

export default Exam;
