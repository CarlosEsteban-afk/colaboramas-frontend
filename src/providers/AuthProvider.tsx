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
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          // Try to fetch current user from server to ensure token validity and latest data
          try {
            const meResp = await api.get("/auth/me");
            const currentUser = meResp.data;
            console.debug("[auth] current user loaded from /auth/me:", currentUser);
            await AsyncStorage.setItem(AUTHUSER, JSON.stringify(currentUser));
            setUser(currentUser);
            setIsAuthenticated(true);
          } catch (meErr) {
            // If fetching /auth/me fails, fallback to stored user (if any)
            console.debug("[auth] /auth/me failed, falling back to stored user", meErr?.response?.status || meErr);
            await loadUser();
            setIsAuthenticated(true);
          }
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
    try {
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
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 404) {
          throw new Error("INVALID_CREDENTIALS");
        }
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

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
