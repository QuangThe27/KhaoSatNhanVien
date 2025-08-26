import { Table, Button, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './User.module.scss';
import { getUsers, deleteUser } from '../../../services/userService';

const cx = classNames.bind(styles);

function User() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getUsers();
                const formatted = data.map((item, index) => ({
                    key: index + 1,
                    id: item.id,
                    fullName: item.fullName,
                    email: item.email,
                    role: item.role,
                    departmentName: item.department?.name || 'Chưa có',
                }));
                setUsers(formatted);
            } catch (error) {
                message.error('Không thể tải dữ liệu người dùng');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;

        try {
            await deleteUser(id);
            message.success('Xóa người dùng thành công');
            setUsers((prev) => prev.filter((user) => user.id !== id));
        } catch (error) {
            message.error('Không thể xóa người dùng');
        }
    };

    const columns = [
        { title: 'STT', dataIndex: 'key', key: 'key', width: '5%' },
        { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName', width: '25%' },
        { title: 'Email', dataIndex: 'email', key: 'email', width: '25%' },
        { title: 'Vai trò', dataIndex: 'role', key: 'role', width: '15%' },
        { title: 'Phòng ban', dataIndex: 'departmentName', key: 'departmentName', width: '20%' },
        {
            title: 'Chức năng',
            key: 'actions',
            width: '10%',
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => navigate(`/admin/users/edit/${record.id}`)}
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
                <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/users/add')}>
                    Thêm người dùng
                </Button>
            </div>

            <Table dataSource={users} columns={columns} loading={loading} pagination={false} bordered />
        </div>
    );
}

export default User;
