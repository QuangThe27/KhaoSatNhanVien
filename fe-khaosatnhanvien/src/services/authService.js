const BASE_URL = 'https://localhost:7173/api/auth';
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/login?token=${API_TOKEN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    return response.json();
};

export const forgotPassword = async (email) => {
    const response = await fetch(`${BASE_URL}/forgot-password?token=${API_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error(await response.text());
};

export const resetPassword = async (email, token, newPassword) => {
    const response = await fetch(`${BASE_URL}/reset-password?token=${API_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newPassword }),
    });
    if (!response.ok) throw new Error(await response.text());
};
