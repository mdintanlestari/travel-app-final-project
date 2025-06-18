import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
