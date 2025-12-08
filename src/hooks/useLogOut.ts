import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export const useLogout = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("auth_user");
      userContext?.setUser(undefined);

      // navegar al login reseteando stack
      router.replace("/auth/login");
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    }
  };

  return { handleLogout };
};
