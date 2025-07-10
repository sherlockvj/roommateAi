// components/PublicOnlyRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PublicOnlyRoute = ({ children }) => {
  const { user, loadingUser } = useAuth();

  if (loadingUser) return <div>Loading...</div>;
  if (user) return <Navigate to="/" replace />;
  return children;
};

export default PublicOnlyRoute;
