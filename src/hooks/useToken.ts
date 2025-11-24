import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


export const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("auth_token");
        setToken(storedToken);
      } catch (e) {
        console.error("Error al cargar el token:", e);
      }
    };
    loadToken();
  }, []);

  return token;
};
