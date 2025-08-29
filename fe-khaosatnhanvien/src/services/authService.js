const BASE_URL = 'https://localhost:7173/api/auth';
const API_TOKEN = 'abc12343';

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
