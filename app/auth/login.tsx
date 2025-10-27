import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
      router.push("/home");
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
      {/* Campo de email */}
      <View style={styles.inputContainer}>
        <Monicon name="hugeicons:student" size={20} color="#3b82f6" />
        <View style={{ width: 8 }} />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#3b82f6"
          autoCapitalize="none"
        />
      </View>

      {/* Campo de contraseña */}
      <View style={styles.inputContainer}>
        <Monicon name="fluent-mdl2:lock" size={20} color="#3b82f6" />
        <View style={{ width: 8 }} />
        <TextInput
          style={styles.input}
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

      {/* Error */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={{ marginBottom: 16 }} />
      )}

      {/* Botón login */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Enlace registro */}
      <TouchableOpacity onPress={() => router.push("/auth/preregister")}>
        <Text style={styles.registerLink}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  input: {
    flex: 1,
    color: "#3b82f6",
    fontSize: 16,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 16,
    alignSelf: "center",
    width: "80%",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  registerLink: {
    textAlign: "center",
    color: "#60a5fa",
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
