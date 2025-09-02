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
