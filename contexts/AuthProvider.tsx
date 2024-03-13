"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react";

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
  role: "customer" | "admin" | "host";
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  update: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (userData: User, token: string) => {
    localStorage.setItem("token", JSON.stringify(token));
    setUser(userData);
  };

  const update = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, update }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
