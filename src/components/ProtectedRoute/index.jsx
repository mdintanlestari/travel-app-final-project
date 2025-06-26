import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user.role);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (user.role === "admin" || user.role === requiredRole) {
    return <>{children || <Outlet />}</>;
  }

  return <Navigate to={"/"} />;
};

export default ProtectedRoute;
