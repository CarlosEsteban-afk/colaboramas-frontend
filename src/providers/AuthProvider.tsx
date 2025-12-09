import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import api from "../../client";
import { useUser } from "../hooks/useUser";

const AUTHTOKEN = "auth_token";
const AUTHUSER = "auth_user";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
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
        if (!token) {
          setLoading(false);
          return;
        }

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        try {
          const { data: user } = await api.get("/auth/me");

          await AsyncStorage.setItem(AUTHUSER, JSON.stringify(user));
          setUser(user);
          setIsAuthenticated(true);
        } catch (err) {
          await AsyncStorage.multiRemove([AUTHTOKEN, AUTHUSER]);
          setUser(undefined);
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.error("Error loading auth state:", e);
      } finally {
        setLoading(false);
      }
    };

    loadAuthState();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await AsyncStorage.multiRemove([AUTHTOKEN, AUTHUSER]);
      setUser(undefined);
      setIsAuthenticated(false);

      const response = await api.post("/auth/login", { email, password });
      const token = response.data.token;

      await AsyncStorage.setItem(AUTHTOKEN, token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data: user } = await api.get("/auth/me");

      await AsyncStorage.setItem(AUTHUSER, JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("INVALID_CREDENTIALS");
      }
      throw new Error("NETWORK_ERROR");
    }
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
      if (!token) return false;

      await AsyncStorage.setItem(AUTHTOKEN, token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data: user } = await api.get("/auth/me");

      await AsyncStorage.setItem(AUTHUSER, JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Error registrando:", error);
      return false;
    }
  };

  // ---- LOGOUT ----
  const signOut = async () => {
    await AsyncStorage.multiRemove([AUTHTOKEN, AUTHUSER]);
    setUser(undefined);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
