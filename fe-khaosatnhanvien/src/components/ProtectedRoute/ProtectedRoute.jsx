import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRoles }) {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    // Nếu chưa đăng nhập
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Nếu có yêu cầu role và user không nằm trong danh sách
    if (requiredRoles && !requiredRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    // Cho phép hiển thị component con
    return children;
}

export default ProtectedRoute;
