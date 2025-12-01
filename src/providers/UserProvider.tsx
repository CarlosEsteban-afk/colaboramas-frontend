import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models/user.interface";

interface UserContextType {
  user?: User;
  setUser: (user?: User) => Promise<void>;
  loadUser: () => Promise<void>;
  loading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("auth_user");
      if (storedUser) {
        setUserState(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Error cargando usuario:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const setUser = async (u?: User) => {
    setUserState(u);
    if (u) {
      await AsyncStorage.setItem("auth_user", JSON.stringify(u));
    } else {
      await AsyncStorage.removeItem("auth_user");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loadUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
