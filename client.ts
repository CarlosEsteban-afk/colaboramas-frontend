import axios from "axios";
import { Platform } from "react-native";

// Dirección IP de la máquina host donde corre el backend.
// Cambia esto por la IP de tu equipo en la red local (comprueba con `ip -4 addr show scope global`).
// - Si pruebas en Android emulator (Android Studio default), usa `10.0.2.2`.
// - Si pruebas en Genymotion, usa `10.0.3.2`.
// - Si pruebas en dispositivo físico, usa la IP real de tu host (ej: `172.40.135.58`).
const LOCAL_IP = "172.30.197.106";
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
