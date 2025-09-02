import { useEffect, useState } from 'react';
import { getExams } from '../../../services/examService';
import { createExamResult } from '../../../services/examResultService';
import { Card, Row, Col, Spin, message, Tag, Button } from 'antd';
import {
    FileTextOutlined,
    UserOutlined,
    DeploymentUnitOutlined,
    InfoCircleOutlined,
    FieldTimeOutlined,
    PlayCircleOutlined,
} from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './ExamList.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ExamList() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')); // { id, ... }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getExams();
                setExams(data);
            } catch {
                message.error('Không thể tải danh sách bài kiểm tra');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleStartExam = async (examId) => {
        if (!user) {
            message.error('Bạn cần đăng nhập để làm bài');
            return;
        }
        try {
            // Tạo ExamResult và LƯU examResultId vào localStorage
            const created = await createExamResult(examId, user.id, 0);
            if (!created?.id) {
                message.error('Không nhận được ExamResultId từ server');
                return;
            }
            localStorage.setItem('examResultId', String(created.id)); // 👈 QUAN TRỌNG
            localStorage.setItem('currentExamId', String(examId)); // tiện đối chiếu/khôi phục
            navigate(`/exam/${examId}`);
        } catch (error) {
            console.error(error);
            message.error('Không thể khởi tạo kết quả bài kiểm tra');
        }
    };

    return (
        <div className={cx('exam-container')}>
            <h1 className={cx('exam-title')}>Danh sách bài kiểm tra</h1>
            {loading ? (
                <Spin size="large" />
            ) : (
                <Row gutter={[24, 24]}>
                    {exams.map((exam) => (
                        <Col xs={24} sm={12} md={12} lg={6} key={exam.id}>
                            <Card
                                hoverable
                                className={cx('exam-card')}
                                title={
                                    <span>
                                        <FileTextOutlined /> {exam.name}
                                    </span>
                                }
                                bordered={false}
                                actions={[
                                    <Button
                                        type="primary"
                                        icon={<PlayCircleOutlined />}
                                        onClick={() => handleStartExam(exam.id)}
                                    >
                                        Làm bài
                                    </Button>,
                                ]}
                            >
                                <p className={cx('exam-desc')}>
                                    <InfoCircleOutlined /> {exam.description || 'Không có mô tả'}
                                </p>
                                <p>
                                    <UserOutlined /> Vị trí: <b>{exam.jobPosition || 'Không xác định'}</b>
                                </p>
                                <p>
                                    <DeploymentUnitOutlined /> Trình độ:{' '}
                                    <Tag color="blue" style={{ fontWeight: 500 }}>
                                        {exam.level || 'Chưa có'}
                                    </Tag>
                                </p>
                                <p>
                                    <FieldTimeOutlined /> Thời gian:{' '}
                                    <b>{exam.durationMinutes || 'Không xác định'} phút</b>
                                </p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default ExamList;
