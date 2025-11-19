
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Teacher } from '../types';

type UserRole = 'leader' | 'teacher' | null;

interface AuthContextType {
  role: UserRole;
  currentUser: Teacher | null; // Null if leader or not logged in
  loginAsLeader: () => void;
  loginAsTeacher: (teacher: Teacher) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [currentUser, setCurrentUser] = useState<Teacher | null>(null);

  const loginAsLeader = () => {
    setRole('leader');
    setCurrentUser(null);
  };

  const loginAsTeacher = (teacher: Teacher) => {
    setRole('teacher');
    setCurrentUser(teacher);
  };

  const logout = () => {
    setRole(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ role, currentUser, loginAsLeader, loginAsTeacher, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
