const BASE_URL = 'https://localhost:7173/api/cauhoi';
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const getQuestions = async () => {
    const response = await fetch(`${BASE_URL}?token=${API_TOKEN}`);
    if (!response.ok) throw new Error('Không thể tải danh sách câu hỏi');
    return response.json();
};

export const getQuestionById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}?token=${API_TOKEN}`);
    if (!response.ok) throw new Error('Không tìm thấy câu hỏi');
    return response.json();
};

export const createQuestion = async (questionData) => {
    const response = await fetch(`${BASE_URL}?token=${API_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionData),
    });
    if (!response.ok) throw new Error(await response.text());
};

export const updateQuestion = async (id, questionData) => {
    const response = await fetch(`${BASE_URL}/${id}?token=${API_TOKEN}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(id), ...questionData }),
    });
    if (!response.ok) throw new Error('Không thể cập nhật câu hỏi');
};

export const deleteQuestion = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}?token=${API_TOKEN}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Không thể xóa câu hỏi');
};
