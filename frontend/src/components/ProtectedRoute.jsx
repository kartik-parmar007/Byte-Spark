import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');

    // Simple token check. In a real app, you might want to decode/validate expiration
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
