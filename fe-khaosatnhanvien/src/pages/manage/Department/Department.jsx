import { Table, Button, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Department.module.scss';
import { getDepartments, deleteDepartment } from '../../../services/departmentService';

const cx = classNames.bind(styles);

function Department() {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getDepartments();
                const formatted = data.map((item, index) => ({
                    key: index + 1,
                    id: item.id,
                    name: item.name,
                }));
                setDepartments(formatted);
            } catch (error) {
                message.error('Không thể tải dữ liệu phòng ban');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa phòng ban này?')) return;

        try {
            await deleteDepartment(id);
            message.success('Xóa phòng ban thành công');
            setDepartments((prev) => prev.filter((dept) => dept.id !== id));
        } catch (error) {
            message.error('Không thể xóa phòng ban');
        }
    };

    const columns = [
        { title: 'STT', dataIndex: 'key', key: 'key', width: '10%' },
        { title: 'Tên phòng ban', dataIndex: 'name', key: 'name', width: '60%' },
        {
            title: 'Chức năng',
            key: 'actions',
            width: '30%',
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => navigate(`/admin/phongban/edit/${record.id}`)}
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
        <div className={cx('container')} style={{ padding: '24px' }}>
            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/phongban/add')}>
                    Thêm phòng ban
                </Button>
            </div>

            <Table dataSource={departments} columns={columns} loading={loading} pagination={false} bordered />
        </div>
    );
}

export default Department;
