const BASE_URL = 'https://localhost:7173/api/ketqua-kiemtra';
const API_TOKEN = 'abc12343';

// Lấy tất cả kết quả
export const getAllExamResults = async () => {
    const url = `${BASE_URL}?token=${API_TOKEN}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to get all exam results');
    }

    return await res.json();
};

export const createExamResult = async (examId, userId, totalScore = 0) => {
    const response = await fetch(`${BASE_URL}?token=${API_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examId, userId, totalScore }),
    });
    if (!response.ok) throw new Error((await response.text()) || 'Không thể tạo kết quả kiểm tra');
    return response.json();
};

export const getExamResultsByUser = async (userId) => {
    const url = `${BASE_URL}/user/${userId}?token=${API_TOKEN}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Failed to get exam results for user ${userId}`);
    }

    const data = await res.json();
    return data;
};

// Xóa kết quả
export const deleteExamResult = async (id) => {
    const url = `${BASE_URL}/${id}?token=${API_TOKEN}`;
    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
    return true;
};
