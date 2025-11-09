import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id?: number;
  name: string;
  email: string;
  role?: string;
}

interface UserContextType {
  user?: User;
  setUser: (user: User) => void;
  loadUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("auth_user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (e) {
      console.error("Error cargando usuario:", e);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadUser }}>
      {children}
    </UserContext.Provider>
  );
};
