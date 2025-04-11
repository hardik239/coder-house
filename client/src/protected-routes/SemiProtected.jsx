import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const SemiProtected = ({ children, ...rest }) => {
  const { user, auth } = useSelector((state) => state.auth);

  if (!auth) return <Navigate to="/" replace />;

  if (auth && !user.activated) return children;

  return <Navigate to="/rooms" replace />;
};

export default SemiProtected;
