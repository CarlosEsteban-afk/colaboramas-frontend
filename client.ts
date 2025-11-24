import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("auth_token");
    console.log("🔍 TOKEN ENVIADO EN REQUEST:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  console.log("🔍 HEADERS FINALES:", config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
