import React, { createContext, ReactNode } from "react";
import api from "../client";
interface User {
  id?: number;
  name: string;
  email: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface UserContextType {
  user?: User;
  registerUser: (data: RegisterData) => Promise<boolean>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const registerUser = async (data: RegisterData): Promise<boolean> => {
    try {
      const response = await api.post("/auth/register", data);
      console.log("Usuario registrado:", response.data);
      return true;
    } catch (error: any) {
      console.error("Error al registrar usuario:", error.response?.data || error);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ registerUser }}>
      {children}
    </UserContext.Provider>
  );
};
