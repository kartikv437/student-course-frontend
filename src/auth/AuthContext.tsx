// src/auth/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api } from '../api';

type AuthContextType = {
  token: string | null;
  isAuthed: boolean;
  loginWithToken: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthed: false,
  loginWithToken: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  // Load from storage
  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
    }
  }, []);

  const loginWithToken = (t: string) => {
    setToken(t);
    localStorage.setItem('token', t);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.clear(); 
    delete api.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider value={{ token, isAuthed: !!token, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
