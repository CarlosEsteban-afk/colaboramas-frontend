import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";
import { Monicon } from "@monicon/native";
import React from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => router.push("/home");

  return (
    <LinearGradient
      colors={[
        lightTheme.colors["primary-pink"],
        lightTheme.colors["primary-purple"],
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className="flex-1 justify-center px-6">
        <Text className="text-2xl font-bold text-center mb-3 text-white">
          Iniciar Sesión
        </Text>

        <Text className="text-sm text-center mb-6 text-white leading-tight">
          Conéctate con la comunidad académica{"\n"}y comparte tu experiencia
        </Text>

        <View className="flex-row items-center border border-blue-500 rounded-lg px-2 py-1.5 mb-3 bg-white/90 w-[full] self-center">
          <Monicon name="hugeicons:student" size={20} color="#3b82f6" />
          <TextInput
            className="flex-1 text-blue-500 text-sm"
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#3b82f6"
          />
        </View>

        <View className="flex-row items-center border border-blue-500 rounded-lg px-2 py-1.5 mb-3 bg-white/90 w-[full] self-center">
          <Monicon name="fluent-mdl2:lock" size={20} color="#3b82f6" />
          <TextInput
            className="flex-1 text-blue-500 text-sm"
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#3b82f6"
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          //onPress={() => router.push("/auth/forgot-password")}
          className="self-center mb-3"
        >
          <View className="flex-row items-center">
            <Monicon name="info" size={15} />
            <Text className="text-black text-xs underline ml-2">
              ¿Olvidaste tu contraseña?
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-500 py-2.5 rounded-lg items-center mb-2 w-[70%] self-center"
          onPress={handleLogin}
        >
          <Text className="text-white font-semibold text-base">Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/register")}>
          <View className="flex-row justify-center mt-2">
            <Text className="text-gray-200 text-sm">¿No tienes cuenta? </Text>
            <Text className="text-blue-500 font-semibold text-sm">
              Regístrate
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
