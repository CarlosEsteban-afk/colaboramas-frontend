import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCompleteProfile } from "../../src/hooks/useCompleteProfile";
import { useUser } from "../../src/hooks/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function ProfileEditView() {
  const { completeProfile } = useCompleteProfile();
  const { user, setUser } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    educacion: "",
    pais: "",
    ciudad: "",
    investigacion: "",
    formacion: "",
    intereses: "",
    motivaciones: "",
    actividades: "",
    proyectos: "",
    aceptaTerminos: false,
  });

  const handleChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.aceptaTerminos) {
      Alert.alert("Atención", "Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      const updatedUser = await completeProfile(user.id, formData);
      setUser(updatedUser);
      await AsyncStorage.setItem("auth_user", JSON.stringify(updatedUser));

      router.replace("/screens"); 
      Alert.alert("Éxito", "Perfil guardado correctamente.");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo guardar el perfil. Intenta nuevamente.");
    }
  };

  const fields = [
    { label: "Educación", name: "educacion", placeholder: "Ejemplo: Universidad XYZ" },
    { label: "País", name: "pais", placeholder: "Selecciona tu país" },
    { label: "Ciudad", name: "ciudad", placeholder: "Selecciona tu ciudad" },
    { label: "Campos de investigación", name: "investigacion", placeholder: "¿Qué has investigado?" },
    { label: "Formación", name: "formacion", placeholder: "Selecciona tu nivel de formación" },
    { label: "Líneas de interés", name: "intereses", placeholder: "¿Qué te gustaría investigar?" },
    { label: "Motivaciones", name: "motivaciones", placeholder: "¿Qué te motiva a investigar?" },
    { label: "Actividades personales", name: "actividades", placeholder: "¿Qué te gusta hacer en tu tiempo libre?" },
    { label: "Proyectos recientes", name: "proyectos", placeholder: "Menciona algunos proyectos" },
  ];

  return (
    <LinearGradient colors={["#ec4899", "#8b5cf6"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Completa tu perfil</Text>
          <Text style={styles.subtitle}>
            Esta información será visible en tu perfil. Puedes completarla más tarde.
          </Text>
        </View>

        <View style={styles.form}>
          {fields.map((field) => (
            <View key={field.name} style={styles.fieldContainer}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor="#aaa"
                value={(formData as any)[field.name]}
                onChangeText={(text) => handleChange(field.name, text)}
              />
            </View>
          ))}

          <View style={styles.switchContainer}>
            <Switch
              value={formData.aceptaTerminos}
              onValueChange={(val) => handleChange("aceptaTerminos", val)}
              thumbColor={formData.aceptaTerminos ? "#fff" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#c084fc" }}
            />
            <Text style={styles.termsText}>
              He leído y acepto los <Text style={styles.link}>términos y condiciones</Text>.
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttonOutline}>
              <Text style={styles.buttonOutlineText}>Volver</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonFilled} onPress={handleSubmit}>
              <Text style={styles.buttonFilledText}>Registrar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.skipText}>Omitir</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    color: "#f3e8ff",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  form: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#333",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  termsText: {
    flex: 1,
    color: "#fff",
    fontSize: 13,
    marginLeft: 8,
    flexWrap: "wrap",
  },
  link: {
    color: "#f9a8d4",
    textDecorationLine: "underline",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  buttonOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonOutlineText: {
    color: "#fff",
    fontWeight: "600",
  },
  buttonFilled: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonFilledText: {
    color: "#7e22ce",
    fontWeight: "700",
  },
  skipText: {
    color: "#fff",
    textAlign: "right",
    marginTop: 16,
    textDecorationLine: "underline",
  },
});
