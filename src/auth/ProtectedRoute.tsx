// src/auth/ProtectedRoute.tsx
import React, { JSX } from 'react';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';


export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthed } = useAuth();
  const history = useHistory();

  if (!isAuthed) {
    history.replace('/login');
  }

  return isAuthed ? children : null;
};
