import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform, Modal, Pressable, ScrollView as RNScrollView, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../../theme";
import { EventItem } from "../../components/EventCard";
import api from "../../../client";

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
  const [typeModalVisible, setTypeModalVisible] = useState(false);

  useEffect(() => {
    fetchEventDetail();
  }, [id]);

  const fetchEventDetail = async () => {
    try {
      const res = await api.get(`/admin/events/${id}`);
      const eventData = res.data;
      setEvent({
        id: String(eventData.id),
        title: eventData.title || "",
        type: eventData.type || "Congreso",
        date: eventData.date || "",
        place: eventData.place || eventData.ubication || "",
        description: eventData.description || "",
      });
      setPublished(eventData.isEnabled || eventData.status === "approved");
    } catch (error) {
      console.error("Error fetching event detail:", error);
      // Fallback to mock
      const found = MOCK.find((e) => e.id === id) ?? MOCK[0];
      setEvent(found);
      setPublished(true);
    }
  };

  if (!event) return <Text style={{ padding: 16 }}>Cargando...</Text>;

  const onTogglePublished = async () => {
    try {
      await api.patch(`/admin/banEvent/${id}`);
      await fetchEventDetail();
      Alert.alert("Éxito", "Estado actualizado correctamente");
    } catch (error) {
      console.error("Error toggling event status:", error);
      Alert.alert("Error", "No se pudo actualizar el estado del evento");
    }
  };

  const onChangeType = async (newType: string) => {
    if (!event) return;
    try {
      await api.patch(`/admin/changeEventType/${id}`, { type: newType });
      await fetchEventDetail();
      Alert.alert("Éxito", "Tipo actualizado correctamente");
    } catch (error) {
      console.error("Error changing event type:", error);
      Alert.alert("Error", "No se pudo cambiar el tipo de evento");
    }
  };

  // derive a color for the current event type (same mapping as AdminEventCard)
  const TYPE_COLOR: Record<string, string> = {
    Congreso: "#6B31E8",
    CONGRESO: "#6B31E8",
    Concurso: "#E91E63",
    CONCURSO: "#E91E63",
    Charla: "#EE6C21",
    CHARLA: "#EE6C21",
    Conferencia: "#82A50B",
    CONFERENCIA: "#82A50B",
  };

  const rawType = event?.type ?? "";
  const typeKey = String(rawType);
  const upperKey = typeKey.toUpperCase();
  const color = TYPE_COLOR[typeKey] ?? TYPE_COLOR[upperKey] ?? "#6B31E8";

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <LinearGradient colors={[color, `${color}CC`]} style={styles.header}>
        <Text style={styles.headerTitle}>{event.title}</Text>
        <Text style={styles.headerSubtitle}>{event.type} • {event.date}</Text>
      </LinearGradient>

      <View style={styles.card}>
        {/* Image area: show event.image if available, otherwise a placeholder */}
        <View style={styles.imageContainerCard}>
          {(event as any).image ? (
            <Image source={{ uri: (event as any).image }} style={styles.cardImage} resizeMode="cover" />
          ) : (
            <View style={styles.cardImagePlaceholder}>
              <Text style={styles.cardImagePlaceholderText}>Foto</Text>
            </View>
          )}
        </View>

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

        <View style={styles.actionsRowSingle}>
          <TouchableOpacity style={[styles.actionBtn, published ? styles.activeBtn : styles.inactiveBtn]} onPress={onTogglePublished}>
            <Text style={[styles.actionText, styles.primaryText]}>{published ? "Activo" : "Inactivo"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: color }]} onPress={() => setTypeModalVisible(true)}>
            <Text style={[styles.actionText, styles.primaryText]}>Editar tipo</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={typeModalVisible} transparent animationType="fade" onRequestClose={() => setTypeModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Seleccionar tipo</Text>
              <RNScrollView>
                {[
                  "Congreso",
                  "Concurso",
                  "Charla",
                  "Conferencia",
                ].map((tpe) => (
                  <Pressable
                    key={tpe}
                    style={[styles.modalOption, tpe === event.type ? styles.modalOptionActive : undefined]}
                    onPress={() => {
                      setTypeModalVisible(false);
                      if (tpe !== event.type) onChangeType(tpe);
                    }}
                  >
                    <Text style={styles.modalOptionText}>{tpe}</Text>
                  </Pressable>
                ))}
              </RNScrollView>
              <Pressable style={styles.modalClose} onPress={() => setTypeModalVisible(false)}>
                <Text style={styles.modalCloseText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 140,
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
  imageContainerCard: { width: "100%", height: 140, borderRadius: 8, overflow: 'hidden', marginBottom: 12, backgroundColor: '#eee' },
  cardImage: { width: '100%', height: '100%' },
  cardImagePlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f3f3' },
  cardImagePlaceholderText: { color: '#888', fontWeight: '700' },
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
  actionsRowSingle: { marginTop: 18, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  activeBtn: { backgroundColor: "#4CAF50" },
  inactiveBtn: { backgroundColor: "#e74c3c" },
  typeBtn: { backgroundColor: lightTheme.colors["primary-purple"] },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '100%', maxWidth: 480, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' },
  modalTitle: { fontWeight: '700', fontSize: 16, padding: 14, backgroundColor: '#fff' },
  modalOption: { paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
  modalOptionActive: { backgroundColor: '#f0f6ff' },
  modalOptionText: { fontSize: 14, color: '#222' },
  modalClose: { padding: 12, alignItems: 'center', backgroundColor: '#fff' },
  modalCloseText: { color: '#2b2b2b', fontWeight: '700' },
});
