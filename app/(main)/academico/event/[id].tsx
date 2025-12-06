import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../../../theme";
import { EventItem } from "../../../components/EventCardRight";
import api from "../../../../client";

type Params = { id?: string };

export default function AcademicoEventDetail() {
  const params = useLocalSearchParams() as Params;
  const id = params.id ?? "";

  const [event, setEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEventDetail = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        const eventData = res.data;
        setEvent({
          id: String(eventData.id),
          title: eventData.title || "",
          type: eventData.type || eventData.tipo || "",
          date: eventData.date || "",
          place: eventData.ubication || eventData.place || "",
          description: eventData.description || "",
          image: eventData.imageUrl || eventData.image_url || eventData.image || undefined,
        });
      } catch (error) {
        console.error("Error fetching event detail:", error);
        setEvent(null);
      }
    };

    fetchEventDetail();
  }, [id]);

  if (!event) return <Text style={{ padding: 16 }}>Cargando...</Text>;

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
        <View style={styles.imageContainerCard}>
          {event.image ? (
            <Image source={{ uri: event.image }} style={styles.cardImage} resizeMode="cover" />
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
  imageContainerCard: { width: "100%", height: 140, borderRadius: 8, overflow: "hidden", marginBottom: 12, backgroundColor: "#eee" },
  cardImage: { width: "100%", height: "100%" },
  cardImagePlaceholder: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f3f3f3" },
  cardImagePlaceholderText: { color: "#888", fontWeight: "700" },
  label: { fontSize: 13, color: "#333", fontWeight: "700", marginTop: 6 },
  value: { fontSize: 14, color: "#222", fontWeight: "600" },
  description: { marginTop: 8, color: "#333", lineHeight: 20 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
});
