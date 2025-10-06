import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";
import useRegister from "./hooks/useRegister";

export default function RegisterScreen() {
  const router = useRouter();
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    handleRegister,
  } = useRegister();

  const onRegister = () => {
    const success = handleRegister();
    if (!success) {
      Alert.alert("Error", "Revisa tus datos o el correo ya está registrado");
      return;
    }
    router.push("/home");
  };

  return (
    <View className="flex-1 bg-white justify-center px-4">
      <LinearGradient
        colors={[lightTheme.colors["primary-pink"], lightTheme.colors["primary-purple"]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-4xl p-8 shadow-xl"
      >
        <Text className="text-white text-3xl font-bold text-center mb-8">
          Crear Cuenta
        </Text>

        {/* Nombre */}
        <TextInput
          className="border border-white/60 bg-white/90 rounded-2xl px-5 py-3 mb-4 text-blue-600 text-base"
          placeholder="Nombre completo"
          placeholderTextColor="#6B7280"
          value={name}
          onChangeText={setName}
        />

        {/* Correo */}
        <TextInput
          className={`border rounded-2xl px-5 py-3 mb-1 bg-white/90 text-blue-600 text-base ${
            errors.email ? "border-red-500" : "border-white/60"
          }`}
          placeholder="Correo electrónico"
          placeholderTextColor="#6B7280"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {errors.email ? <Text className="text-red-500 text-sm mb-3">{errors.email}</Text> : <View className="mb-3" />}

        {/* Contraseña */}
        <TextInput
          className={`border rounded-2xl px-5 py-3 mb-1 bg-white/90 text-blue-600 text-base ${
            errors.password ? "border-red-500" : "border-white/60"
          }`}
          placeholder="Contraseña"
          placeholderTextColor="#6B7280"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Confirmar contraseña */}
        <TextInput
          className={`border rounded-2xl px-5 py-3 mb-2 bg-white/90 text-blue-600 text-base ${
            errors.password ? "border-red-500" : "border-white/60"
          }`}
          placeholder="Repetir Contraseña"
          placeholderTextColor="#6B7280"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {errors.password ? <Text className="text-red-500 text-sm mb-4">{errors.password}</Text> : <View className="mb-4" />}

        {/* Botón Registrar */}
        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-2xl items-center mb-4"
          onPress={onRegister}
        >
          <Text className="text-white font-semibold text-base">Registrarse</Text>
        </TouchableOpacity>

        {/* Link Login */}
        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <Text className="text-center text-white underline mt-2">
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
