import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to='/auth/login' state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect to home if user doesn't have required role
    return <Navigate to='/' replace />;
  }

  return children;
};
