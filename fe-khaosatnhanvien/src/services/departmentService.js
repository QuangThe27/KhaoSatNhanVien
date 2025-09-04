const BASE_URL = 'https://localhost:7173/api/phongban';
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

// Lấy danh sách phòng ban
export const getDepartments = async () => {
    const response = await fetch(`${BASE_URL}?token=${API_TOKEN}`);
    if (!response.ok) throw new Error('Lỗi khi gọi API');
    return response.json();
};

// Tạo phòng ban mới
export const createDepartment = async (name) => {
    const response = await fetch(`${BASE_URL}?token=${API_TOKEN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });

    if (!response.ok) throw new Error('Lỗi khi tạo phòng ban');
};

// Xóa phòng ban
export const deleteDepartment = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}?token=${API_TOKEN}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Xóa thất bại');
};

// Lấy phòng ban theo ID
export const getDepartmentById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}?token=${API_TOKEN}`);
    if (!response.ok) throw new Error('Không tìm thấy phòng ban');
    return response.json();
};

// Cập nhật phòng ban
export const updateDepartment = async (id, name) => {
    const response = await fetch(`${BASE_URL}/${id}?token=${API_TOKEN}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: parseInt(id), name }),
    });

    if (!response.ok) throw new Error('Lỗi khi cập nhật');
};
