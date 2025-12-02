import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../../theme";
import { EventItem } from "../../components/EventCard";

type Params = { id?: string };

const MOCK: EventItem[] = [
  {
    id: "1",
    title: "Jornada de Investigación 2025",
    type: "Congreso",
    date: "10 October 2025",
    place: "Auditorio Principal",
    description: "Encuentro anual de investigadores con ponencias y poster sessions.",
  },
  {
    id: "2",
    title: "Concurso de Innovación",
    type: "Concurso",
    date: "22 November 2025",
    place: "Sala B",
    description: "Competencia entre equipos para presentar prototipos innovadores.",
  },
];

export default function AdminEventDetails() {
  const router = useRouter();
  const params = useLocalSearchParams() as Params;
  const id = params.id ?? "";

  const [event, setEvent] = useState<EventItem | null>(null);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    // Load from MOCK for now; replace with backend fetch if available
    const found = MOCK.find((e) => e.id === id) ?? MOCK[0];
    setEvent(found);
    // default published state for demo
    setPublished(true);
  }, [id]);

  if (!event) return null;

  const onDelete = () => {
    Alert.alert("Confirmar", "¿Eliminar este evento? Esta acción no se puede deshacer.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          console.log("DELETE EVENT", event.id);
          Alert.alert("Hecho", "Evento eliminado.");
          router.back();
        },
      },
    ]);
  };

  const onTogglePublished = () => {
    setPublished((p) => !p);
    console.log("TOGGLE PUBLISHED", event.id, !published);
  };

  const onEdit = () => {
    // If you later add an edit screen, navigate to it. Use a cast to avoid strict route typing here.
    router.push((`/admin/event/${event.id}/edit`) as any);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <LinearGradient colors={[lightTheme.colors["primary-purple"], "#9b5aff"]} style={styles.header}>
        <Text style={styles.headerTitle}>{event.title}</Text>
        <Text style={styles.headerSubtitle}>{event.type} • {event.date}</Text>
      </LinearGradient>

      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Lugar</Text>
          <Text style={styles.value}>{event.place}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>Tipo</Text>
          <Text style={styles.value}>{event.type}</Text>
        </View>

        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.ghostButton]} onPress={() => router.back()}>
            <Text style={[styles.ghostText]}>Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, published ? styles.unpublish : styles.primary]} onPress={onTogglePublished}>
            <Text style={[styles.actionText, published ? styles.unpublishText : styles.primaryText]}>{published ? "Despublicar" : "Publicar"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, styles.warn]} onPress={onDelete}>
            <Text style={[styles.actionText, styles.warnText]}>Eliminar</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 8 }}>
          <TouchableOpacity style={[styles.editBtn]} onPress={onEdit}>
            <LinearGradient colors={[lightTheme.colors["primary-purple"], "#8e4bff"]} style={styles.submitGradient}>
              <Text style={styles.submitText}>Editar evento</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    fontSize: 24,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#fff",
    marginTop: 6,
  },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  label: { fontSize: 13, color: "#333", fontWeight: "700", marginTop: 6 },
  value: { fontSize: 14, color: "#222", fontWeight: "600" },
  description: { marginTop: 8, color: "#333", lineHeight: 20 },
  actionsRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  actionBtn: { flex: 1, borderRadius: 8, paddingVertical: 12, alignItems: "center", marginHorizontal: 4 },
  actionText: { color: '#222', fontWeight: '700' },
  ghostButton: { borderWidth: 1, borderColor: lightTheme.colors["primary-purple"], backgroundColor: "transparent" },
  ghostText: { color: lightTheme.colors["primary-purple"], fontWeight: "700" },
  primary: { backgroundColor: lightTheme.colors["primary-purple"] },
  primaryText: { color: "#fff", fontWeight: "700" },
  warn: { backgroundColor: "#E33" },
  warnText: { color: "#fff", fontWeight: "700" },
  unpublish: { backgroundColor: "#4CAF50" },
  unpublishText: { color: "#fff", fontWeight: "700" },
  editBtn: { marginTop: 8, borderRadius: 8, overflow: "hidden" },
  submitGradient: { paddingVertical: 12, alignItems: "center", borderRadius: 8 },
  submitText: { color: "#fff", fontWeight: "800" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
});
