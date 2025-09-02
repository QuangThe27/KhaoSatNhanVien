const BASE_URL = 'https://localhost:7173/api/dapan-tracnghiem';
const API_TOKEN = 'abc12343';

/*
[
  {
    "id": 14,
    "questionId": 8,
    "content": "1 cách",
    "isCorrect": false,
    "question": {
      "id": 8,
      "content": "Có mấy cách CSS",
      "questionType": "MultipleChoice",
      "score": 5
    }
  }
]
*/

export const getAnswersByQuestionId = async (questionId) => {
    const response = await fetch(`${BASE_URL}/question/${questionId}?token=${API_TOKEN}`);
    if (!response.ok) throw new Error('Không thể tải danh sách đáp án');
    return response.json();
};

export const createAnswer = async (answerData) => {
    const response = await fetch(`${BASE_URL}?token=${API_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answerData),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Không thể thêm đáp án');
    }
    return response.json();
};

export const deleteAnswer = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}?token=${API_TOKEN}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Không thể xóa đáp án');
};
