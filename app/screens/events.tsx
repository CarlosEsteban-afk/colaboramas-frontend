import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import SearchBar from "../components/SearchBar";
import EventCardRight, { EventItem } from "../components/EventCardRight";
import { lightTheme } from "../../theme";

// --- TU CLAVE DE API AQUÍ ---
// Es mejor usar variables de entorno, pero para empezar, puedes pegarla aquí.
const EVENTBRITE_API_KEY = "KVD2ENGAQ7PTMDB3BQVU";

export default function EventsScreen() {
  const router = useRouter();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      // ¡Ahora sí! Usamos el endpoint de búsqueda con una consulta simple.
      // Añadimos expand=venue,logo para obtener datos del lugar y el logo.
      const apiUrl = "https://www.eventbriteapi.com/v3/events/search/?q=Technology&expand=venue,logo";

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${EVENTBRITE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => response.text());
          throw new Error(`Error de red: ${response.status} - ${JSON.stringify(errorBody)}`);
        }

        // La API devuelve un objeto con una propiedad "events" que es el array que necesitamos.
        const data = await response.json();
        setEvents(data.events);
        console.log('Eventos encontrados:', data.events.length);

      } catch (e: any) {
        setError(`No se pudieron cargar los eventos: ${e.message}`);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // El array vacío asegura que esto se ejecute solo una vez

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

    return events.map((event) => (
      <View key={event.id} style={styles.eventWrapper}>
        <EventCardRight event={event} />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Events</Text>
        <Text style={styles.subtitle}>Find events and contests</Text>
        <SearchBar/>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      {/* Botón flotante */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => router.push("/home/create-event")}
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
});
