import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const GeustProtected = ({ children, ...rest }) => {
  const { auth } = useSelector((state) => state.auth);

  if (auth) return <Navigate to="/rooms" replace />;
  return children;
};

export default GeustProtected;
