import { Form, Input, Button, Card, message } from 'antd';
import classNames from 'classnames/bind';
import styles from './Department.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDepartmentById, updateDepartment } from '../../../services/departmentService';

const cx = classNames.bind(styles);

function EditDepartment() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getDepartmentById(id);
                form.setFieldsValue({ departmentName: data.name });
            } catch (error) {
                message.error('Lỗi khi tải dữ liệu phòng ban');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, form]);

    const onFinish = async (values) => {
        try {
            await updateDepartment(id, values.departmentName);
            message.success('Cập nhật phòng ban thành công!');
            navigate('/admin/phongban');
        } catch (error) {
            message.error('Không thể cập nhật phòng ban');
        }
    };

    return (
        <div className={cx('container')} style={{ padding: '24px' }}>
            <Card title="Chỉnh sửa phòng ban">
                <Form form={form} layout="vertical" style={{ maxWidth: 600, margin: '0 auto' }} onFinish={onFinish}>
                    <Form.Item
                        label="Tên phòng ban"
                        name="departmentName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban!' }]}
                    >
                        <Input placeholder="Nhập tên phòng ban" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default EditDepartment;
