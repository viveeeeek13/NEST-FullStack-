import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Or a spinner component

  if (isLoggedIn) return children;
  return <Navigate to="/login" replace />
}
