const BASE_URL = 'https://localhost:7173/api/baikiemtra';
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

/*
[
  {
    "id": 13,
    "name": "Bài kiểm tra số 01",
    "description": "Bài kiểm tra năng lực đợt 1",
    "durationMinutes": 60,
    "jobPosition": "FE",
    "level": "Jonier",
    "createdAt": "2025-09-01T03:34:11.84",
    "updatedAt": "2025-09-01T03:34:11.84"
  }
]
*/

export const getExams = async () => {
    const response = await fetch(`${BASE_URL}?token=${API_TOKEN}`);
    if (!response.ok) throw new Error('Không thể tải danh sách bài kiểm tra');
    return response.json();
};

export const getExamById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}?token=${API_TOKEN}`);
    if (!response.ok) throw new Error('Không tìm thấy bài kiểm tra');
    return response.json();
};

export const createExam = async (examData) => {
    const response = await fetch(`${BASE_URL}?token=${API_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examData),
    });
    if (!response.ok) throw new Error(await response.text());
};

export const updateExam = async (id, examData) => {
    const response = await fetch(`${BASE_URL}/${id}?token=${API_TOKEN}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(id), ...examData }),
    });
    if (!response.ok) throw new Error('Không thể cập nhật bài kiểm tra');
};

export const deleteExam = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}?token=${API_TOKEN}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Không thể xóa bài kiểm tra');
};
