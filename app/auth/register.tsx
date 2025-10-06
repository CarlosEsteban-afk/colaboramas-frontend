import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";
import useRegister from "./hooks/useRegister";

export default function Register() {
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    errors, handleRegister
  } = useRegister();

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}>
        <LinearGradient
          colors={[lightTheme.colors["primary-pink"], lightTheme.colors["primary-purple"]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-4xl p-8 shadow-2xl"
        >
          <Text className="text-white text-3xl font-bold text-center mb-10">Crear Cuenta</Text>

          <TextInput
            className="border border-white/60 bg-white/90 rounded-3xl px-5 py-4 mb-5 text-blue-600 text-base"
            placeholder="Nombre completo"
            placeholderTextColor="#6B7280"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            className={`border rounded-3xl px-5 py-4 mb-1 bg-white/90 text-blue-600 text-base ${errors.email ? "border-red-500" : "border-white/60"}`}
            placeholder="Correo electrónico"
            placeholderTextColor="#6B7280"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {errors.email ? <Text className="text-red-500 text-sm mb-4">{errors.email}</Text> : <View className="mb-4" />}

          <TextInput
            className={`border rounded-3xl px-5 py-4 mb-1 bg-white/90 text-blue-600 text-base ${errors.password ? "border-red-500" : "border-white/60"}`}
            placeholder="Contraseña"
            placeholderTextColor="#6B7280"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            className={`border rounded-3xl px-5 py-4 mb-3 bg-white/90 text-blue-600 text-base ${errors.password ? "border-red-500" : "border-white/60"}`}
            placeholder="Repetir Contraseña"
            placeholderTextColor="#6B7280"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {errors.password ? <Text className="text-red-500 text-sm mb-5">{errors.password}</Text> : <View className="mb-5" />}

          <TouchableOpacity
            className="bg-blue-500 py-4 rounded-3xl items-center mb-5"
            onPress={handleRegister}
          >
            <Text className="text-white font-semibold text-lg">Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className="text-center text-white underline mt-2">¿Ya tienes cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}
