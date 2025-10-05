

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { lightTheme } from "../../theme";
import { LinearGradient } from "expo-linear-gradient";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = () => {
    router.push("/home");
  };

  return (
     <LinearGradient
          colors={[lightTheme.colors["primary-pink"], lightTheme.colors["primary-purple"]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View></LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 30, color: "#fff" },
    input: {
        borderWidth: 1,
        borderColor: "#3188F2",
        backgroundColor: "#fff",   
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        color: "#3188F2", 
    },
    button: {
        backgroundColor: "#3188F2",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: { color: "#fff", fontWeight: "600" },
    linkText: { textAlign: "center", color: "#3A7AFE", marginTop: 10 },
});
