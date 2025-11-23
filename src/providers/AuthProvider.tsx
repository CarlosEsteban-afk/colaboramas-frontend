import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import api from "../../client";
import { useUser } from "../hooks/useUser";

const AUTHTOKEN = "auth_token";
const AUTHUSER = "auth_user";

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    name: string,
    email: string,
    password: string,
    role: string[]
  ) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setUser, loadUser } = useUser();

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem(AUTHTOKEN);
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          await loadUser();
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error("Failed to load auth state", e);
      } finally {
        setLoading(false);
      }
    };
    loadAuthState();
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    const token = response.data.token;

    await AsyncStorage.setItem(AUTHTOKEN, token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const userResponse = await api.get("/auth/me");
    const user = userResponse.data;
    console.log("User data on signIn:", user);
    await AsyncStorage.setItem(AUTHUSER, JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    roles: string[]
  ): Promise<boolean> => {
    try {
      const response = await api.post("/auth/register", {
        username: name,
        email,
        password,
        roleRequest: { roleListName: roles },
      });
      const token = response.data.token;
      if (!token) {
        console.error("No se recibió token en la respuesta");
        return false;
      }
      await AsyncStorage.setItem(AUTHTOKEN, token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userResponse = await api.get("/auth/me");
      const user = userResponse.data;
      await AsyncStorage.setItem(AUTHUSER, JSON.stringify(user));
      console.log("User data on signUp:", user);
      console.log("Roles assigned:", token);
      setUser(user);
      setIsAuthenticated(true);

      return true;
    } catch (error: any) {
      console.error("Error de registro:", error.response?.data || error);
      return false;
    }
  };

  const signOut = async () => {
    await AsyncStorage.multiRemove([AUTHTOKEN, AUTHUSER]);
    setUser(undefined);
    setIsAuthenticated(false);
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
