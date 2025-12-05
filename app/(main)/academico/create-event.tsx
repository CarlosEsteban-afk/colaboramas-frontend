import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../../theme";
import { EventItem } from "../../components/EventCard";

export default function CreateEventScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"Congreso" | "Concurso" | "Charla" | "Conferencia">("Congreso");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");

  const submit = () => {
    if (!title.trim()) return Alert.alert("Error", "El título es obligatorio.");
    const newEvent: EventItem = {
      id: String(Date.now()),
      title,
      type,
      date,
      place,
      description,
    };
    console.log("CREATED EVENT", newEvent);
    Alert.alert("Hecho", "Evento creado.");
    router.back();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={[lightTheme.colors["primary-purple"], "#9b5aff"]} style={styles.header}>
          <Text style={styles.headerTitle}>Crear evento</Text>
          <Text style={styles.headerSubtitle}>Rellena los datos del evento</Text>
        </LinearGradient>

        <View style={styles.formCard}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ej. Charla: Nuevas tendencias en IA"
            style={styles.input}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Tipo</Text>
          <View style={styles.pillsRow}>
            {(["Congreso", "Concurso", "Charla", "Conferencia"] as const).map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.pill,
                  type === p && { backgroundColor: lightTheme.colors["primary-purple"], elevation: 2 },
                ]}
                onPress={() => setType(p)}
              >
                <Text style={[styles.pillText, type === p && { color: "#fff", fontWeight: "700" }]}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Fecha</Text>
          <TextInput value={date} onChangeText={setDate} placeholder="Ej. October 10th, 2025" style={styles.input} placeholderTextColor="#999" />

          <Text style={styles.label}>Lugar</Text>
          <TextInput value={place} onChangeText={setPlace} placeholder="Ej. Auditorio B" style={styles.input} placeholderTextColor="#999" />

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Descripción corta del evento"
            style={[styles.input, styles.textArea]}
            multiline
            placeholderTextColor="#999"
          />

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.ghostButton} onPress={() => router.back()}>
              <Text style={styles.ghostText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={submit}>
              <LinearGradient colors={[lightTheme.colors["primary-purple"], "#8e4bff"]} style={styles.submitGradient}>
                <Text style={styles.submitText}>Crear evento</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: "#F6F6F6",
  },
  header: {
    paddingTop: 56,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#fff",
    marginTop: 6,
  },
  formCard: {
    margin: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    // light shadow similar to existing aesthetic
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    color: "#333",
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fafafa",
    color: "#222",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  pillsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 6,
    flexWrap: "wrap",
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  pillText: {
    color: "#444",
    fontWeight: "600",
  },
  actionsRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  ghostButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: lightTheme.colors["primary-purple"],
  },
  ghostText: {
    color: lightTheme.colors["primary-purple"],
    fontWeight: "700",
  },
  submitButton: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  submitGradient: {
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  submitText: {
    color: "#fff",
    fontWeight: "800",
  },
});