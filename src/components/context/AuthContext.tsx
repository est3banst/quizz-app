import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";

export type AppUser = {
  email?: string;
  isGuest: boolean;
};

type AuthContextType = {
  user: AppUser | null; 
  setUser: (user: AppUser | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    if (auth.isAuthenticated) {
      setUser({
        email: auth.user?.profile?.email,
        isGuest: false,
      });
    }
  }, [auth.isAuthenticated, auth.user]);

  const logout = () => {
    setUser(null);
    auth.removeUser(); 
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAppAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAppAuth must be used within an AuthProvider");
  }
  return context;
};
