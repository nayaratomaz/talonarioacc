import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "barber" | "cashier";
  photo?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("barberpro_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call - replace with real authentication
    const mockUsers = [
      { id: "1", name: "Admin Master", email: "admin@barberpro.com", role: "admin" as const, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
      { id: "2", name: "João Manager", email: "manager@barberpro.com", role: "manager" as const, photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
      { id: "3", name: "Carlos Barbeiro", email: "barber@barberpro.com", role: "barber" as const, photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
      { id: "4", name: "Ana Caixa", email: "cashier@barberpro.com", role: "cashier" as const, photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" }
    ];

    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === "123456") {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem("barberpro_user", JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("barberpro_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};