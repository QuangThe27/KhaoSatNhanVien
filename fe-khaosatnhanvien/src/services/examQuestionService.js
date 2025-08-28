const BASE_URL = 'https://localhost:7173/api/baikiemtra-cauhoi';
const API_TOKEN = 'abc12343';

// Lấy danh sách câu hỏi theo ExamId
export const getQuestionsByExamId = async (examId) => {
    const res = await fetch(`${BASE_URL}/by-exam/${examId}?token=${API_TOKEN}`);
    if (!res.ok) throw new Error('Không thể tải danh sách câu hỏi');
    return await res.json();
};

// Xóa câu hỏi trong bài kiểm tra
export const deleteExamQuestion = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}?token=${API_TOKEN}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Không thể xóa câu hỏi');
    return true;
};
