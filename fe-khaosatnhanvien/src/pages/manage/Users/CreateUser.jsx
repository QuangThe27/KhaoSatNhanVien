import { Form, Input, Button, Card, Select, message } from 'antd';
import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createUser } from '../../../services/userService';
import { getDepartments } from '../../../services/departmentService';
import Notification from '../../../components/Notification/Notification';

const cx = classNames.bind(styles);
const { Option } = Select;

function CreateUser() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getDepartments();
                setDepartments(data);
            } catch (error) {
                message.error('Không thể tải danh sách phòng ban');
            }
        };

        fetchDepartments();
    }, []);

    const onFinish = async (values) => {
        try {
            await createUser(values);
            setNotification({
                type: 'success',
                message: 'Thành công',
                description: 'Tạo người dùng thành công!',
            });
            navigate('/admin/users');
        } catch (error) {
            if (error.message.includes('Email đã tồn tại')) {
                setNotification({
                    type: 'error',
                    message: 'Lỗi',
                    description: 'Email đã tồn tại. Vui lòng dùng email khác.',
                });
            } else {
                setNotification({
                    type: 'error',
                    message: 'Lỗi',
                    description: 'Không thể tạo người dùng. Vui lòng thử lại.',
                });
            }
        }
    };

    return (
        <div className={cx('container')} style={{ padding: '24px' }}>
            <Card title="Thêm người dùng mới">
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
                        label="Mật khẩu (hash)"
                        name="passwordHash"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input placeholder="Nhập mật khẩu đã mã hóa" />
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
                            Lưu
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

export default CreateUser;
