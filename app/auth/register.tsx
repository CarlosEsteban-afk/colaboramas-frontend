import React from "react";
import { TextInput, TouchableOpacity, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import useRegister from "../../hooks/useRegister";
import AuthLayout from "../authLayout";

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
    
    <AuthLayout title="Crear Cuenta" card cardGradient showLogo={false}>
      <TextInput
        className="border border-white/50 bg-white/90 rounded-2xl px-5 py-3 mb-4 text-blue-600 text-base"
        placeholder="Nombre completo"
        placeholderTextColor="#6B7280"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        className={`border rounded-2xl px-5 py-3 mb-2 bg-white/90 text-blue-600 text-base ${
          errors.email ? "border-red-500" : "border-white/50"
        }`}
        placeholder="Correo electrónico"
        placeholderTextColor="#6B7280"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        className={`border rounded-2xl px-5 py-3 mb-2 bg-white/90 text-blue-600 text-base ${
          errors.password ? "border-red-500" : "border-white/50"
        }`}
        placeholder="Contraseña"
        placeholderTextColor="#6B7280"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        className={`border rounded-2xl px-5 py-3 mb-4 bg-white/90 text-blue-600 text-base ${
          errors.password ? "border-red-500" : "border-white/50"
        }`}
        placeholder="Repetir contraseña"
        placeholderTextColor="#6B7280"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-2xl items-center mb-4 w-4/5 self-center"
        onPress={onRegister}
      >
        <Text className="text-white font-semibold text-base">Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text className="text-center text-blue-300 underline text-sm">
          ¿Ya tienes cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
