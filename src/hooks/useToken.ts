import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const AUTHTOKEN = "auth_token";

export const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(AUTHTOKEN);
        setToken(storedToken);
      } catch (e) {
        console.error("Error al cargar el token:", e);
      }
    };
    loadToken();
  }, []);

  return token;
};
