import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BottomBar from "../../components/BottomBar";
import SearchBar from "../../components/SearchBar";
import EventCard, { EventItem } from "../../components/EventCard";
import { lightTheme } from "../../theme";

export default function EventsScreen() {
  // Datos de ejemplo para los eventos
  const events: EventItem[] = [
    {
      id: "1",
      title: "2do Congreso Internacional de Ciencias de la Rehabilitación",
      date: "October 24th-25th, 2025",
      place: "",
      type: "Congreso",
    },
    {
      id: "2",
      title: "Concurso ANID-FAPESP 2025",
      date: "September 1st, 2025",
      place: "",
      type: "Concurso",
    },
    {
      id: "3",
      title: "Concurso Mejor Lector/Lectora UFRO",
      date: "November 29th, 08:00 horas",
      place: "",
      type: "Concurso",
    },
    {
      id: "4",
      title: '1er Congreso Interuniversitario "Agricultura Sostenible: Situación Actual y Perspectivas"',
      date: "September 25th, 09:00 horas",
      place: "Aula Magna de la Universidad",
      type: "Conferencia",
    },
  ];

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
        {events.map((event) => (
          <View key={event.id} style={styles.eventWrapper}>
            <EventCard event={event} />
          </View>
        ))}
      </ScrollView>
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  eventWrapper: {
    marginBottom: 16,
    width: "100%",
  },
});
