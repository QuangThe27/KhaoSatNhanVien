const BASE_URL = 'https://localhost:7173/api/users';

// Lấy danh sách tất cả người dùng
export const getUsers = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Không thể tải danh sách người dùng');
    return response.json();
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Không tìm thấy người dùng');
    return response.json();
};

// Tạo người dùng mới
export const createUser = async (userData) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorText = await response.text(); // lấy nội dung lỗi từ API
        throw new Error(errorText);
    }
};

// Cập nhật thông tin người dùng
export const updateUser = async (id, userData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: parseInt(id), ...userData }),
    });

    if (!response.ok) throw new Error('Không thể cập nhật người dùng');
};

// Xóa người dùng
export const deleteUser = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Không thể xóa người dùng');
};
