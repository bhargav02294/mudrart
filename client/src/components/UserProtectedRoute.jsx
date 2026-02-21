import { Navigate } from "react-router-dom";

export default function UserProtectedRoute({ children }) {
  const token = localStorage.getItem("userToken");

  if (!token) return <Navigate to="/account" />;

  return children;
}