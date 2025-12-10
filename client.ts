import axios from "axios";
import { Platform } from "react-native";

const LOCAL_IP = "192.168.1.90"; // Replace with your machine's local IP address
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

export default api;
