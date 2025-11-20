import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const useLogout = () => {
  const userContext = useContext(UserContext);
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("auth_user");
      userContext?.setUser(undefined);          
      navigation.reset({
        index: 0,
        routes: [{ name: "auth/login" }],            
      });
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    }
  };

  return { handleLogout };
};
