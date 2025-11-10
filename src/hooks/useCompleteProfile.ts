import api from "../../client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../hooks/useUser";

const AUTHUSER = "auth_user";

export const useCompleteProfile = () => {
  const { setUser } = useUser();

  const completeProfile = async (userId: number, formData: any) => {
    try {
      await api.put(`/profiles/${userId}`, formData);

      const userResponse = await api.get("/auth/me");
      const updatedUser = userResponse.data;

      setUser(updatedUser);
      await AsyncStorage.setItem(AUTHUSER, JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error: any) {
      console.error("Error al completar perfil:", error.response?.data || error.message);
      throw error;
    }
  };

  return { completeProfile };
};
