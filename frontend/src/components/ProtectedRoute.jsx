import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const hasStoredToken =
    typeof window !== "undefined" && Boolean(localStorage.getItem("token"));

  if (!isAuthenticated && !hasStoredToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
