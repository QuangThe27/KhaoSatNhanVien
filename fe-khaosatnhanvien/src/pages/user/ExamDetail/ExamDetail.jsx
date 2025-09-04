import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionsByExamId } from '../../../services/examQuestionService';
import { getExamById } from '../../../services/examService';
import { getAnswersByQuestionId } from '../../../services/answerService';
import { createExamQuestionResults } from '../../../services/examQuestionResultService';
import { Card, Spin, Typography, Radio, Input, Tag, Button } from 'antd';
import Notification from '../../../components/Notification/Notification';
import './ExamDetail.scss';

const { Title } = Typography;
const { TextArea } = Input;

function ExamDetail() {
    const { id } = useParams(); // examId
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [examResultId, setExamResultId] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchExamData = async () => {
            setLoading(true);
            try {
                const examData = await getExamById(id);
                setExam(examData);
                if (examData.durationMinutes) setTimeLeft(examData.durationMinutes * 60);

                const questionData = await getQuestionsByExamId(id);
                setQuestions(questionData);

                const answerPromises = questionData.map((q) =>
                    q.question.questionType === 'MultipleChoice'
                        ? getAnswersByQuestionId(q.questionId)
                        : Promise.resolve([]),
                );
                const answersResult = await Promise.all(answerPromises);
                const mapped = {};
                questionData.forEach((q, idx) => {
                    if (answersResult[idx].length > 0) {
                        mapped[q.questionId] = answersResult[idx];
                    }
                });
                setAnswers(mapped);

                // Lấy ExamResultId đã lưu ở ExamList
                const er = localStorage.getItem('examResultId');
                if (er) setExamResultId(parseInt(er, 10));
            } catch (error) {
                console.error(error);
                setNotification({
                    type: 'error',
                    message: 'Lỗi tải dữ liệu',
                    description: 'Không thể tải dữ liệu bài kiểm tra.',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchExamData();
    }, [id]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    handleSubmit(); // auto nộp khi hết giờ
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]); // eslint-disable-line

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleAnswerChange = (questionId, value, type) => {
        setUserAnswers((prev) => ({ ...prev, [questionId]: { value, type } }));
    };

    const handleSubmit = async () => {
        if (!examResultId) {
            setNotification({
                type: 'error',
                message: 'Không tìm thấy ExamResultId',
                description: 'Hãy quay lại danh sách và vào lại bài thi.',
            });
            return;
        }

        try {
            const payload = questions.map((q) => {
                const userAns = userAnswers[q.questionId];
                let score = 0;

                if (q.question.questionType === 'MultipleChoice') {
                    const correct = answers[q.questionId]?.find((a) => a.isCorrect);
                    if (correct && userAns?.value && correct.id === userAns.value) {
                        score = q.question.score; // đúng: lấy full điểm câu hỏi
                    }
                }
                return {
                    examResultId,
                    questionId: q.questionId,
                    answerId: q.question.questionType === 'MultipleChoice' ? (userAns?.value ?? null) : null,
                    essayAnswers: q.question.questionType === 'Essay' ? (userAns?.value ?? null) : null,
                    score,
                };
            });

            await createExamQuestionResults(payload);

            setNotification({
                type: 'success',
                message: 'Nộp bài thành công',
                description: 'Bài kiểm tra của bạn đã được ghi nhận.',
            });

            // Xóa dấu vết kỳ thi hiện tại
            localStorage.removeItem('examResultId');
            localStorage.removeItem('currentExamId');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error(error);
            setNotification({
                type: 'error',
                message: 'Nộp bài thất bại',
                description: 'Đã xảy ra lỗi khi lưu kết quả. Vui lòng thử lại.',
            });
        }
    };

    return (
        <div className="exam-detail-container">
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    {exam && (
                        <div className="exam-header">
                            <Title level={2}>{exam.name}</Title>
                            <p>
                                Thời gian còn lại:{' '}
                                <Tag color="red" style={{ fontSize: 16, padding: '4px 12px' }}>
                                    {formatTime(timeLeft)}
                                </Tag>
                            </p>
                        </div>
                    )}

                    {questions.map((q, index) => (
                        <Card key={q.id} className="question-card" title={`Câu ${index + 1}`}>
                            <p className="question-content">
                                <b>Nội dung:</b> {q.question.content}
                            </p>
                            <p>
                                <b>Điểm:</b> {q.question.score}
                            </p>

                            {q.question.questionType === 'Essay' ? (
                                <TextArea
                                    rows={4}
                                    placeholder="Nhập câu trả lời của bạn..."
                                    onChange={(e) => handleAnswerChange(q.questionId, e.target.value, 'Essay')}
                                />
                            ) : (
                                <Radio.Group
                                    onChange={(e) => handleAnswerChange(q.questionId, e.target.value, 'MultipleChoice')}
                                >
                                    {answers[q.questionId]?.map((ans) => (
                                        <Radio key={ans.id} value={ans.id}>
                                            {ans.content}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            )}
                        </Card>
                    ))}

                    <div style={{ marginTop: 20, textAlign: 'center' }}>
                        <Button type="primary" size="large" onClick={handleSubmit}>
                            Nộp bài
                        </Button>
                    </div>
                </>
            )}

            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    description={notification.description}
                    duration={3500}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
}

export default ExamDetail;
