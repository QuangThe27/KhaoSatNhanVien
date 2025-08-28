// import { useEffect, useState } from 'react';
// import { Card, Checkbox, Button, message, Spin } from 'antd';
// import { useParams, useNavigate } from 'react-router-dom';
// import { createExamQuestions } from '../../../services/examQuestionService';

// const BASE_URL = 'https://localhost:7173/api/cauhoi';
// const API_TOKEN = 'abc12343';

// function CreateExamQuestion() {
//     const { id: examId } = useParams();
//     const navigate = useNavigate();
//     const [questions, setQuestions] = useState([]);
//     const [selectedIds, setSelectedIds] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchQuestions = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch(`${BASE_URL}?token=${API_TOKEN}`);
//                 if (!response.ok) throw new Error();
//                 const data = await response.json();
//                 setQuestions(data);
//             } catch {
//                 message.error('Không thể tải danh sách câu hỏi');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchQuestions();
//     }, []);

//     const handleSubmit = async () => {
//         if (selectedIds.length === 0) {
//             message.warning('Vui lòng chọn ít nhất một câu hỏi');
//             return;
//         }

//         try {
//             await createExamQuestions(parseInt(examId), selectedIds);
//             message.success('Thêm câu hỏi thành công!');
//             navigate('/admin/baikiemtra');
//         } catch {
//             message.error('Không thể thêm câu hỏi');
//         }
//     };

//     return (
//         <div style={{ padding: '24px' }}>
//             <Card title="Thêm câu hỏi vào bài kiểm tra">
//                 {loading ? (
//                     <Spin />
//                 ) : (
//                     <Checkbox.Group
//                         style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
//                         value={selectedIds}
//                         onChange={setSelectedIds}
//                     >
//                         {questions.map((q) => (
//                             <Checkbox key={q.id} value={q.id}>
//                                 <strong>{q.content}</strong> — <em>{q.questionType}</em> — <span>{q.score} điểm</span>
//                             </Checkbox>
//                         ))}
//                     </Checkbox.Group>
//                 )}
//                 <div style={{ marginTop: '24px' }}>
//                     <Button type="primary" onClick={handleSubmit}>
//                         Lưu câu hỏi
//                     </Button>
//                 </div>
//             </Card>
//         </div>
//     );
// }

// export default CreateExamQuestion;
