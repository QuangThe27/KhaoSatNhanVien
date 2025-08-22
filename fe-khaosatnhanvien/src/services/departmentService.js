const BASE_URL = 'https://localhost:7173/api/phongban';

export const getDepartments = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Lỗi khi gọi API');
    return response.json();
};

export const createDepartment = async (name) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });

    if (!response.ok) {
        throw new Error('Lỗi khi tạo phòng ban');
    }
};

export const deleteDepartment = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Xóa thất bại');
};

export const getDepartmentById = async (id) => {
    const response = await fetch(`https://localhost:7173/api/phongban/${id}`);
    if (!response.ok) throw new Error('Không tìm thấy phòng ban');
    return response.json();
};

export const updateDepartment = async (id, name) => {
    const response = await fetch(`https://localhost:7173/api/phongban/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: parseInt(id), name }),
    });

    if (!response.ok) throw new Error('Lỗi khi cập nhật');
};
