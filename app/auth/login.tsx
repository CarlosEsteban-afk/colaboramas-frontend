import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Monicon } from "@monicon/native";
import { useAuth } from "../../src/hooks/useAuth";
import AuthLayout from "../layouts/authLayout";

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Error", "Debes ingresar tu correo y contraseña");
    return;
  }

  setLoading(true);
  try {
    await signIn(email, password);

    router.replace("/router/RoleRouter");

  } catch (error) {
    Alert.alert("Error", "Correo o contraseña incorrectos");
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthLayout
      title="Iniciar Sesión"
      subtitle="Conéctate con la comunidad académica y comparte tu experiencia"
      showLogo
    >
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

      <TouchableOpacity
        style={[styles.loginButton, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? "Ingresando..." : "Iniciar Sesión"}
        </Text>
      </TouchableOpacity>

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
