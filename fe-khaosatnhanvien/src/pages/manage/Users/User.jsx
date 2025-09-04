import { Table, Button, Space, message, Input, Select, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './User.module.scss';
import { getUsers, deleteUser } from '../../../services/userService';

const cx = classNames.bind(styles);
const { Option } = Select;

function User() {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // state cho search & filter
    const [searchText, setSearchText] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');

    // load data
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
                setFilteredUsers(formatted);
            } catch (error) {
                message.error('Không thể tải dữ liệu người dùng');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // lọc dữ liệu khi thay đổi search/filter
    useEffect(() => {
        let data = [...users];

        // tìm kiếm theo name/email
        if (searchText) {
            const lower = searchText.toLowerCase();
            data = data.filter(
                (u) => u.fullName.toLowerCase().includes(lower) || u.email.toLowerCase().includes(lower),
            );
        }

        // lọc role
        if (roleFilter) {
            data = data.filter((u) => u.role === roleFilter);
        }

        // lọc phòng ban
        if (departmentFilter) {
            data = data.filter((u) => u.departmentName === departmentFilter);
        }

        setFilteredUsers(data);
    }, [searchText, roleFilter, departmentFilter, users]);

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

    // lấy danh sách role và department duy nhất để filter
    const uniqueRoles = [...new Set(users.map((u) => u.role))];
    const uniqueDepartments = [...new Set(users.map((u) => u.departmentName))];

    const columns = [
        { title: 'STT', dataIndex: 'key', key: 'key', width: '5%' },
        { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName', width: '20%' },
        { title: 'Email', dataIndex: 'email', key: 'email', width: '20%' },
        { title: 'Vai trò', dataIndex: 'role', key: 'role', width: '15%' },
        { title: 'Phòng ban', dataIndex: 'departmentName', key: 'departmentName', width: '20%' },
        {
            title: 'Chức năng',
            key: 'actions',
            width: '20%',
            render: (_, record) => (
                <Space>
                    {/* Nút Sửa: chỉ admin và manager mới thấy */}
                    {(currentUser?.role === 'admin' || currentUser?.role === 'manager') && (
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => navigate(`/admin/users/edit/${record.id}`)}
                        >
                            Sửa
                        </Button>
                    )}

                    {(currentUser?.role === 'admin' ||
                        (currentUser?.role === 'manager' && (record.role === 'staff' || record.role === 'hr'))) && (
                        <Button danger icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record.id)}>
                            Xóa
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className={cx('container')} style={{ padding: '24px' }}>
            {/* Thanh công cụ */}
            <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col span={24} style={{ textAlign: 'right', marginBottom: '15px' }}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate('/admin/users/add')}
                        style={{ marginRight: '10px' }}
                    >
                        Thêm người dùng
                    </Button>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/users/import')}>
                        Import excel
                    </Button>
                </Col>
                <Col span={8}>
                    <Input
                        placeholder="Tìm theo tên hoặc email"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Col>
                <Col span={8}>
                    <Select
                        allowClear
                        placeholder="Lọc theo vai trò"
                        style={{ width: '100%' }}
                        value={roleFilter || undefined}
                        onChange={(value) => setRoleFilter(value || '')}
                    >
                        {uniqueRoles.map((role) => (
                            <Option key={role} value={role}>
                                {role}
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col span={8}>
                    <Select
                        allowClear
                        placeholder="Lọc theo phòng ban"
                        style={{ width: '100%' }}
                        value={departmentFilter || undefined}
                        onChange={(value) => setDepartmentFilter(value || '')}
                    >
                        {uniqueDepartments.map((dep) => (
                            <Option key={dep} value={dep}>
                                {dep}
                            </Option>
                        ))}
                    </Select>
                </Col>
            </Row>

            {/* Bảng */}
            <Table
                dataSource={filteredUsers}
                columns={columns}
                loading={loading}
                pagination={{ pageSize: 10 }}
                bordered
            />
        </div>
    );
}

export default User;
