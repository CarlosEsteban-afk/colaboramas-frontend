import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

const AUTHTOKEN = " auth_token";
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
interface AuthContextType {
  isAuthenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem(AUTHTOKEN);
        setIsAuthenticated(!!token);
      } catch (e) {
        console.error("Failed to load auth state", e);
      } finally {
        setLoading(false);
      }
    };
    loadAuthState();
  }, []);

  const signIn = async () => {
    await AsyncStorage.setItem(AUTHTOKEN, "dummy-auth-token");
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(AUTHTOKEN);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
