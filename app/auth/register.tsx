import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import useRegister from "../../src/hooks/useRegister";
import AuthLayout from "../layouts/authLayout";
import FormField from "../components/FormField";
export default function RegisterScreen() {
  const { role } = useLocalSearchParams<{ role?: string }>();
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

  const onRegister = async () => {
    const roles = role ? [role as "ACADEMICO" | "COMUNICADOR"] : [];
    const success = await handleRegister(roles);

    if (!success) return;

    router.push("/auth/completeProfile");
  };

  return (
    <AuthLayout title="Crear Cuenta" card cardGradient showLogo={false}>
      <View className="w-full space-y-2 ">
        <FormField
          value={name}
          onChangeText={setName}
          placeholder="Nombre completo"
          error={errors.name}
        />

        <FormField
          value={email}
          onChangeText={setEmail}
          placeholder="Correo electrónico"
          error={errors.email}
          keyboardType="email-address"
        />

        <FormField
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          secureTextEntry
          error={errors.password}
        />

        <FormField
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Repetir contraseña"
          secureTextEntry
          error={errors.confirmPassword}
        />

        {/* BOTON */}
        <TouchableOpacity
          onPress={onRegister}
          className="w-[80%] mt-4 self-center rounded-md overflow-hidden"
        >
          <Text
            className="
      text-center text-white font-semibold text-base py-3
      bg-blue-500
    "
          >
            Registrarse
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <Text className="text-center text-blue-300 underline text-sm mt-2">
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}
