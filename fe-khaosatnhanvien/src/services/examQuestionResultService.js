const BASE_URL = 'https://localhost:7173/api/dapan-baikiemtra';
const API_TOKEN = 'abc12343';

export const createExamQuestionResults = async (results) => {
    const response = await fetch(`${BASE_URL}?token=${API_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(results), // gửi mảng JSON
    });
    if (!response.ok) throw new Error((await response.text()) || 'Không thể lưu kết quả câu hỏi');
    return response.json();
};

export const getExamQuestionResultsByExamResultId = async (examResultId) => {
    const res = await fetch(`${BASE_URL}/examresult/${examResultId}?token=${API_TOKEN}`);
    if (!res.ok) {
        throw new Error(`Không thể tải chi tiết bài kiểm tra ${examResultId}`);
    }
    return res.json();
};

export const updateExamQuestionScore = async (id, score) => {
    const res = await fetch(`${BASE_URL}/${id}/score?token=${API_TOKEN}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(score),
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
};
