import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";
import { Monicon } from "@monicon/native";
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => router.push("/home");

  return (
    <LinearGradient
      colors={[lightTheme.colors["primary-pink"], lightTheme.colors["primary-purple"]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className="flex-1 justify-center px-5">
        <Text className="text-2xl font-bold text-center mb-6 text-white">
          Iniciar Sesión
        </Text>
        <Text className="text-base text-center mb-5 text-white">
          Y comienza a conectar con la comunidad académica de NN
        </Text>

        <Monicon name="hugeicons:student" size={32} color="white" style={{ alignSelf: "center", marginBottom: 16 }} />

        <TextInput
          className="border border-blue-500 rounded-lg p-3 mb-3 bg-white text-blue-500"
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          className="border border-blue-500 rounded-lg p-3 mb-3 bg-white text-blue-500"
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-lg items-center mb-3"
          onPress={handleLogin}
        >
          <Text className="text-white font-semibold">Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/register")}>
          <Text className="text-center text-white mt-2">
            ¿No tienes cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
