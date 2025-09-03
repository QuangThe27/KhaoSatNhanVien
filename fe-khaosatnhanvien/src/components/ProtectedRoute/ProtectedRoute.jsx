import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole }) {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    // Nếu chưa đăng nhập
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Nếu có yêu cầu role mà user không thỏa
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    // Cho phép hiển thị component con
    return children;
}

export default ProtectedRoute;
