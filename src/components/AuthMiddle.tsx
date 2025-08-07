import { useAuth } from "react-oidc-context";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const AuthMiddle = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const isGuest = localStorage.getItem("guest") === "true";

  if (auth.isLoading) return <Loader />;

  if (!auth.isAuthenticated && !isGuest) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthMiddle;
