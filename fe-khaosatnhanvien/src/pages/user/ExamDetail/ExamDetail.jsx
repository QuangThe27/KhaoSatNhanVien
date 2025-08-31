import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionsByExamId } from '../../../services/examQuestionService';
import { getExamById } from '../../../services/examService';
import { getAnswersByQuestionId } from '../../../services/answerService';
import { Card, Spin, message, Typography, Radio, Input, Tag } from 'antd';
import './ExamDetail.scss';

const { Title } = Typography;
const { TextArea } = Input;

function ExamDetail() {
    const { id } = useParams();
    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0); // giây còn lại

    // Lấy dữ liệu bài kiểm tra + câu hỏi
    useEffect(() => {
        const fetchExamData = async () => {
            setLoading(true);
            try {
                const examData = await getExamById(id);
                setExam(examData);

                // thiết lập thời gian đếm ngược
                if (examData.durationMinutes) {
                    setTimeLeft(examData.durationMinutes * 60);
                }

                const questionData = await getQuestionsByExamId(id);
                setQuestions(questionData);

                // load đáp án cho câu multiple choice
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
            } catch (error) {
                console.error(error);
                message.error('Lỗi tải dữ liệu bài kiểm tra');
            } finally {
                setLoading(false);
            }
        };
        fetchExamData();
    }, [id]);

    // Đếm ngược thời gian
    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    message.warning('Hết thời gian làm bài!');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    // format hiển thị mm:ss
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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
                                Thời gian làm bài:{' '}
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
                                <TextArea rows={4} placeholder="Nhập câu trả lời của bạn..." />
                            ) : (
                                <Radio.Group>
                                    {answers[q.questionId]?.map((ans) => (
                                        <Radio key={ans.id} value={ans.id}>
                                            {ans.content}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            )}
                        </Card>
                    ))}
                </>
            )}
        </div>
    );
}

export default ExamDetail;
