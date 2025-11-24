import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const LOCAL_IP = "192.168.1.85";
const PORT = 8080;
const baseURL =
  Platform.OS === "web"
    ? `http://localhost:${PORT}/api`
    : `http://${LOCAL_IP}:${PORT}/api`;

console.log("🌐 API BASE URL:", baseURL);

const api = axios.create({
  baseURL,
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
