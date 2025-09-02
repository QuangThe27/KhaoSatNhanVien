const BASE_URL = 'https://localhost:7173/api/ketqua-kiemtra';
const API_TOKEN = 'abc12343';

export const createExamResult = async (examId, userId, totalScore = 0) => {
    const response = await fetch(`${BASE_URL}?token=${API_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examId, userId, totalScore }),
    });
    if (!response.ok) throw new Error((await response.text()) || 'Không thể tạo kết quả kiểm tra');
    return response.json();
};

export const getExamResults = async () => {
    const response = await fetch(`${BASE_URL}?token=${API_TOKEN}`);
    if (!response.ok) throw new Error('Không thể tải kết quả');
    return response.json();
};
