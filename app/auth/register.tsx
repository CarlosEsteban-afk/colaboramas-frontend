import React from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
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
      {/* Nombre completo */}
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor="#6B7280"
        value={name}
        onChangeText={setName}
      />

      {/* Correo electrónico */}
      <TextInput
        style={[
          styles.input,
          errors.email && styles.inputError, // si hay error, cambia el borde
        ]}
        placeholder="Correo electrónico"
        placeholderTextColor="#6B7280"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Contraseña */}
      <TextInput
        style={[
          styles.input,
          errors.password && styles.inputError,
        ]}
        placeholder="Contraseña"
        placeholderTextColor="#6B7280"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Confirmar contraseña */}
      <TextInput
        style={[
          styles.input,
          errors.password && styles.inputError,
          { marginBottom: 16 },
        ]}
        placeholder="Repetir contraseña"
        placeholderTextColor="#6B7280"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Botón de registro */}
      <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>

      {/* Enlace a login */}
      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.loginLink}>
          ¿Ya tienes cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 8,
    fontSize: 16,
    color: "#2563eb", // azul 600
  },
  inputError: {
    borderColor: "#ef4444", // rojo-500
  },
  registerButton: {
    backgroundColor: "#3b82f6", // azul-500
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 16,
    alignSelf: "center",
    width: "80%",
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  loginLink: {
    textAlign: "center",
    color: "#93c5fd", // azul-300
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
