import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  name: string;
  email: string;
  password: string; // agregamos contraseña
};

type AuthContextType = {
  user: User | null;
  users: User[]; // lista de usuarios registrados
  register: (newUser: User) => boolean; // true si se registró, false si email existe
  login: (email: string, password: string) => boolean; // true si login correcto
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]); // usuarios registrados
  const [user, setUser] = useState<User | null>(null); // usuario activo

  const register = (newUser: User) => {
    const exists = users.some(u => u.email === newUser.email);
    if (exists) return false; // correo ya registrado
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return true;
  };

  const login = (email: string, password: string) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return false;
    setUser(found);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, users, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
