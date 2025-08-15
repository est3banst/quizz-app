import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useUser } from '../context/UserContext';
import { getCurrentUser } from 'aws-amplify/auth'; 
import Loader from '../components/Loader';
import { useNavigate, useLocation } from 'react-router-dom';

type AuthMiddlewareProps = {
  children: ReactNode;
};

const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        console.log("current user:", currentUser);

        setUser({
          id: currentUser.userId,
          email: currentUser.signInDetails?.loginId || "",
        });

        if ((location.pathname === "/" || location.pathname === "/login") && currentUser) {
          navigate("/quizz", { replace: true });
        }
      } catch {
        setUser(null);

        if (!["/", "/login", "/about"].includes(location.pathname)) {
          navigate("/login", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [setUser, navigate, location.pathname]);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthMiddleware;
