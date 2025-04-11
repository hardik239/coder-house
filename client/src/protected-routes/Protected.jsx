import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
	const { user, auth } = useSelector((state) => state.auth);

	if (!auth) return <Navigate to='/' replace />;

	if (auth && !user.activated) return <Navigate to='/activate' />;

	return children;
};

export default ProtectedRoute;
