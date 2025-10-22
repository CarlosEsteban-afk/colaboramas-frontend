import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Monicon } from "@monicon/native";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";
import AuthLayout from "../authLayout";

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { users, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async () => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      await signIn();
      router.push("/screens/Home");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <AuthLayout
      title="Iniciar Sesión"
      subtitle="Conéctate con la comunidad académica y comparte tu experiencia"
      showLogo
    >
      <View className="flex-row items-center border border-blue-400 rounded-2xl px-4 py-3 mb-4 bg-white/90">
        <Monicon name="hugeicons:student" size={20} color="#3b82f6" />
        <View className="w-2" />
        <TextInput
          className="flex-1 text-blue-600 text-base"
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#3b82f6"
          autoCapitalize="none"
        />
      </View>

      <View className="flex-row items-center border border-blue-400 rounded-2xl px-4 py-3 mb-4 bg-white/90">
        <Monicon name="fluent-mdl2:lock" size={20} color="#3b82f6" />
        <View className="w-2" />
        <TextInput
          className="flex-1 text-blue-600 text-base"
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#3b82f6"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Monicon
            name={showPassword ? "fluent-mdl2:view" : "mdi-light:eye-off"}
            size={20}
            color="#3b82f6"
          />
        </TouchableOpacity>
      </View>

      {error ? (
        <Text className="text-red-500 text-sm mb-4 text-center">{error}</Text>
      ) : (
        <View className="mb-4" />
      )}

      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-2xl items-center mb-4 w-4/5 self-center"
        onPress={handleLogin}
      >
        <Text className="text-white font-semibold text-base">
          Iniciar Sesión
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/preregister")}>
        <Text className="text-center text-blue-300 underline text-sm">
          ¿No tienes cuenta? Regístrate
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
