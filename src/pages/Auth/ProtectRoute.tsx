import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export const ProtectRoutes = () => {
	const { tokens, loading } = useAuth();

	if (loading) return 'authenticating';

	return tokens ? <Outlet /> : <Navigate to="/auth/login" />;
};
