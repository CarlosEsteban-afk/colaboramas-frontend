import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import SearchBar from "../../components/SearchBar";
import EventCardRight, { EventItem } from "../../components/EventCardRight";
import { lightTheme } from "../../../theme";
import api from "../../../client";

// Eventbrite integration removed

export default function EventsScreen() {
  const router = useRouter();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & filters (same behavior as admin/events)
  const [q, setQ] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const resp = await api.get("/events");
        const data = resp.data;
        if (!Array.isArray(data)) {
          throw new Error("Invalid events response");
        }

        const mapType = (t: string) => {
          if (!t) return t;
          const map: Record<string, string> = {
            CHARLA: "Charla",
            CONGRESO: "Congreso",
            CONCURSO: "Concurso",
            CONFERENCIA: "Conferencia",
          };
          return map[t.toUpperCase()] ?? (t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
        };

            const mapped: EventItem[] = data.map((e: any) => ({
          id: String(e.id),
          title: e.title ?? "",
          date: e.date ?? "",
          place: e.ubication ?? e.ubication ?? e.place ?? "",
          type: mapType(e.type ?? e.tipo ?? ""),
          description: e.description ?? "",
          image: e.imageUrl ?? e.image_url ?? e.image ?? undefined,
        }));

        setEvents(mapped);
      } catch (err: any) {
        console.error("Error fetching events:", err);
        setError(err?.message ? String(err.message) : "Error cargando eventos");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={lightTheme.colors["primary-purple"]} style={{ marginTop: 50 }} />;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    if (events.length === 0) {
      return <Text style={styles.errorText}>No se encontraron eventos.</Text>;
    }

    // derive types from loaded events
    const types = Array.from(new Set(events.map((ev) => String(ev.type || '').trim()).filter(Boolean)));

      // apply filters (title/description q and type)
    const filtered = events.filter((e) => {
      const title = String(e.title || "").toLowerCase();
      const ql = q.toLowerCase();
      if (!(title.includes(ql) || String(e.description || "").toLowerCase().includes(ql))) return false;

      if (selectedType) {
        if (String(e.type || '').toLowerCase() !== selectedType.toLowerCase()) return false;
      }
      return true;
    });

    return (
      <>
        {/* Type filters (horizontal chips) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8, marginBottom: 8 }}>
          <TouchableOpacity style={[styles.filterChip, selectedType === '' && styles.filterChipActive]} onPress={() => setSelectedType('')}>
            <Text style={[styles.filterChipText, selectedType === '' && styles.filterChipTextActive]}>Todos</Text>
          </TouchableOpacity>
          {types.map((t) => (
            <TouchableOpacity key={t} style={[styles.filterChip, selectedType === t && styles.filterChipActive]} onPress={() => setSelectedType(t)}>
              <Text style={[styles.filterChipText, selectedType === t && styles.filterChipTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Status filter removed (no active/inactive filter) */}

        {filtered.map((event) => (
          <View key={event.id} style={styles.eventWrapper}>
            <EventCardRight
              event={event}
              onPress={() => router.push(`/academico/event/${event.id}`)}
            />
          </View>
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Events</Text>
        <Text style={styles.subtitle}>Find events and contests</Text>
        <SearchBar
          placeholder="Buscar por título o descripción"
          onChangeText={setQ}
          value={q}
          onApplyFilters={() => {}}
        />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => router.push("/academico/create-event")}
        accessibilityLabel="Crear evento"
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F6F6F6",
  },
  header: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: lightTheme.colors["primary-purple"],
    marginBottom: 8,
    alignSelf:"center"
  },
  subtitle: { 
    color: lightTheme.colors["dark-gray"], 
    fontSize: 16,
    marginBottom: 20,
    alignSelf:"center"
  },
  errorText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#E91E63',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  eventWrapper: {
    marginBottom: 16,
    width: "100%",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: lightTheme.colors["primary-purple"],
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  fabIcon: {
    color: "#fff",
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "700",
  },
  filterChip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#E6DFFF', marginRight: 8, backgroundColor: '#fff' },
  filterChipActive: { backgroundColor: lightTheme.colors['primary-purple'], borderColor: lightTheme.colors['primary-purple'] },
  filterChipText: { color: '#333', fontWeight: '600' },
  filterChipTextActive: { color: '#fff' },
  // status filter styles removed
});
