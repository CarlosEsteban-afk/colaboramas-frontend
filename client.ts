import axios from "axios";
import { Platform } from "react-native";

const LOCAL_IP = "192.168.1.87";
const PORT = 8080;

const baseURL =
  Platform.OS === "web"
    ? `http://localhost:${PORT}/api`
  : `http://${LOCAL_IP}:${PORT}/api`;
   // : `http://localhost:${PORT}/api`;
console.log("🌐 API BASE URL:", baseURL);

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
