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
import api from "../../../client";
import { useUser } from "../../../src/hooks/useUser";

export default function CreateEventScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"Congreso" | "Concurso" | "Charla" | "Conferencia">("Congreso");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { user } = useUser();

  const submit = () => {
    if (!title.trim()) return Alert.alert("Error", "El título es obligatorio.");
    // Build payload matching backend expectations
    const payload = {
      title: title.trim(),
      type: String(type).toUpperCase(),
      date: date.trim(),
      ubication: place.trim(),
      description: description.trim(),
      userId: user?.id ?? null,
      imageUrl: imageUrl.trim() || undefined,
    } as any;

    const doSubmit = async () => {
      try {
        setSubmitting(true);
        const res = await api.post("/events", payload);
        console.log("Event created:", res.data);
        Alert.alert("Éxito", "Evento creado correctamente.", [
          { text: "Ver evento", onPress: () => router.push(`/academico/event/${res.data.id}`) },
          { text: "Volver", onPress: () => router.back(), style: "cancel" },
        ]);
      } catch (err: any) {
        console.error("Error creating event:", err);
        Alert.alert("Error", err?.response?.data?.message ?? err?.message ?? "No se pudo crear el evento");
      } finally {
        setSubmitting(false);
      }
    };

    doSubmit();
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

          <Text style={styles.label}>Imagen (URL)</Text>
          <TextInput value={imageUrl} onChangeText={setImageUrl} placeholder="https://example.com/image.png" style={styles.input} placeholderTextColor="#999" />

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

            <TouchableOpacity style={styles.submitButton} onPress={submit} disabled={submitting}>
              <LinearGradient colors={[lightTheme.colors["primary-purple"], "#8e4bff"]} style={styles.submitGradient}>
                <Text style={styles.submitText}>{submitting ? "Creando..." : "Crear evento"}</Text>
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