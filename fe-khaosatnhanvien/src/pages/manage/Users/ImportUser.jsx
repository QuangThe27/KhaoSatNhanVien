import { Upload, Button, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { importUsers } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';

function ImportUser() {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleUpload = async () => {
        if (!file) {
            message.error('Vui lòng chọn file Excel trước khi upload');
            return;
        }
        try {
            const result = await importUsers(file);
            message.success(result.Message);

            navigate('/admin/users');
        } catch (error) {
            message.error('Không thể import dữ liệu');
        }
    };

    const props = {
        beforeUpload: (file) => {
            setFile(file);
            return false; // Ngăn upload tự động
        },
        onRemove: () => setFile(null),
    };

    return (
        <Card title="Import người dùng từ Excel" style={{ maxWidth: 600, margin: '20px auto' }}>
            <Upload {...props} maxCount={1} accept=".xlsx,.xls">
                <Button icon={<UploadOutlined />}>Chọn file Excel</Button>
            </Upload>
            <Button type="primary" onClick={handleUpload} style={{ marginTop: 16 }}>
                Upload
            </Button>
        </Card>
    );
}

export default ImportUser;
