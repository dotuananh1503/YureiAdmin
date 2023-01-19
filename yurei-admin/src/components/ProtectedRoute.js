import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem("access_token");
  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};