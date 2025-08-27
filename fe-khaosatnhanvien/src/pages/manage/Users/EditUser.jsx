import { Form, Input, Button, Card, Select, message, Spin } from 'antd';
import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserById, updateUser } from '../../../services/userService';
import { getDepartments } from '../../../services/departmentService';
import Notification from '../../../components/Notification/Notification';

const cx = classNames.bind(styles);
const { Option } = Select;

function EditUser() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams(); // lấy id từ URL
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);

    // Lấy danh sách phòng ban + thông tin user theo ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [deptData, userData] = await Promise.all([getDepartments(), getUserById(id)]);

                setDepartments(deptData);

                // set dữ liệu mặc định cho form
                form.setFieldsValue({
                    fullName: userData.fullName,
                    email: userData.email,
                    password: userData.password, // hoặc bỏ nếu không muốn hiện lại
                    role: userData.role,
                    level: userData.level,
                    departmentId: userData.departmentId,
                });
            } catch (error) {
                message.error('Không thể tải dữ liệu người dùng');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, form]);

    const onFinish = async (values) => {
        try {
            await updateUser(id, values);
            setNotification({
                type: 'success',
                message: 'Thành công',
                description: 'Cập nhật người dùng thành công!',
            });
            navigate('/admin/users');
        } catch (error) {
            setNotification({
                type: 'error',
                message: 'Lỗi',
                description: 'Không thể cập nhật người dùng. Vui lòng thử lại.',
            });
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className={cx('container')} style={{ padding: '24px' }}>
            <Card title="Chỉnh sửa người dùng">
                <Form form={form} layout="vertical" style={{ maxWidth: 600, margin: '0 auto' }} onFinish={onFinish}>
                    <Form.Item
                        label="Họ tên"
                        name="fullName"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                        <Input placeholder="Nhập họ tên" />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                        <Input placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input placeholder="Nhập mật khẩu đã" />
                    </Form.Item>

                    <Form.Item
                        label="Vai trò"
                        name="role"
                        rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                    >
                        <Select placeholder="Chọn vai trò">
                            <Option value="admin">Admin</Option>
                            <Option value="hr">HR</Option>
                            <Option value="manager">Manager</Option>
                            <Option value="staff">Staff</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Cấp độ"
                        name="level"
                        rules={[{ required: true, message: 'Vui lòng chọn cấp độ!' }]}
                    >
                        <Select placeholder="Chọn cấp độ">
                            <Option value="fresher">Fresher</Option>
                            <Option value="junior">Junior</Option>
                            <Option value="middle">Middle</Option>
                            <Option value="senior">Senior</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Phòng ban"
                        name="departmentId"
                        rules={[{ required: true, message: 'Vui lòng chọn phòng ban!' }]}
                    >
                        <Select placeholder="Chọn phòng ban">
                            {departments.map((dept) => (
                                <Option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    description={notification.description}
                    duration={3000}
                />
            )}
        </div>
    );
}

export default EditUser;
