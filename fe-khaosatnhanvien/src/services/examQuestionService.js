const BASE_URL = 'https://localhost:7173/api/baikiemtra-cauhoi';
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

/* Mẫu json nhận được
[
  {
    "id": 31,
    "examId": 13,
    "questionId": 8,
    "exam": {
      "id": 13,
      "name": "Bài kiểm tra số 01",
      "jobPosition": "FE",
      "level": "Jonier"
    },
    "question": {
      "id": 8,
      "content": "Có mấy cách CSS",
      "questionType": "MultipleChoice",
      "score": 5
    }
  }
]
*/

// Lấy danh sách câu hỏi theo ExamId
export const getQuestionsByExamId = async (examId) => {
    const res = await fetch(`${BASE_URL}/by-exam/${examId}?token=${API_TOKEN}`);
    if (!res.ok) throw new Error('Không thể tải danh sách câu hỏi');
    return await res.json();
};

// Tạo nhiều câu hỏi cho bài kiểm tra
export const createExamQuestions = async (examId, questionIds) => {
    const res = await fetch(`${BASE_URL}/bulk?token=${API_TOKEN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            examId,
            questionIds,
        }),
    });
    if (!res.ok) throw new Error('Không thể thêm câu hỏi');
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
