import { Form, Input, Button, Card, message } from 'antd';
import classNames from 'classnames/bind';
import styles from './Department.module.scss';
import { useNavigate } from 'react-router-dom';
import { createDepartment } from '../../../services/departmentService';

const cx = classNames.bind(styles);

function CreateDepartment() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            await createDepartment(values.departmentName);
            message.success('Tạo phòng ban thành công!');
            navigate('/admin/phongban');
        } catch (error) {
            console.error(error);
            message.error('Không thể tạo phòng ban');
        }
    };

    return (
        <div className={cx('container')} style={{ padding: '24px' }}>
            <Card title="Thêm phòng ban mới">
                <Form form={form} layout="vertical" style={{ maxWidth: 600, margin: '0 auto' }} onFinish={onFinish}>
                    <Form.Item
                        label="Tên phòng ban"
                        name="departmentName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban!' }]}
                    >
                        <Input placeholder="Nhập tên phòng ban" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default CreateDepartment;
