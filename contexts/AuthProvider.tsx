"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  aboutMe: string;
  language: string;
  profession: string;
  profilePicture: string;
  authProvider: string;
  role: 'customer' | 'admin' | 'host'; 
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    console.log(userData)
    // Logic to authenticate user and set user data
    setUser(userData);
  };

  const logout = () => {
    // Logic to log out user
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
