import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import SearchBar from "../../components/SearchBar";
import EventCard, { EventItem } from "../../components/EventCard";
import { lightTheme } from "../../../../theme";

export default function EventsScreen() {
  const events: EventItem[] = [
    {
      id: "1",
      title: "2do Congreso Internacional de Ciencias de la Rehabilitación",
      date: "October 24th-25th, 2025",
      place: "Centro de Convenciones",
      type: "Congreso",
      description: "Congreso sobre avances en rehabilitación, talleres y ponencias internacionales.",
    },
    {
      id: "2",
      title: "Concurso ANID-FAPESP 2025",
      date: "September 1st, 2025",
      place: "Sede institucional",
      type: "Concurso",
      description: "Concurso de investigación para proyectos conjuntos entre ANID y FAPESP.",
    },
    {
      id: "3",
      title: "Charla: Nuevas tendencias en inteligencia artificial",
      date: "October 10th, 2025",
      place: "Auditorio B",
      type: "Charla",
      description: "Charla corta sobre aplicaciones prácticas y éticas de la IA.",
    },
    {
      id: "4",
      title: '1er Congreso Interuniversitario "Agricultura Sostenible"',
      date: "September 25th, 09:00 horas",
      place: "Aula Magna de la Universidad",
      type: "Conferencia",
      description: "Mesa redonda y presentaciones sobre prácticas agrícolas sostenibles.",
    },
  ];

  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const openDetails = (event: EventItem) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeDetails = () => {
    setModalVisible(false);
    setSelectedEvent(null);
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
        {events.map((event) => (
          <View key={event.id} style={styles.eventWrapper}>
            <EventCard event={event} onPressDetails={() => openDetails(event)} />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => router.push("/home/create-event")}
        accessibilityLabel="Crear evento"
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeDetails}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable style={styles.closeButton} onPress={closeDetails}>
              <Text style={styles.closeText}>Cerrar</Text>
            </Pressable>

            {selectedEvent && (
              <>
                <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                <Text style={styles.modalMeta}>{selectedEvent.type} · {selectedEvent.date}</Text>
                {selectedEvent.place ? <Text style={styles.modalMeta}>Lugar: {selectedEvent.place}</Text> : null}
                {selectedEvent.description ? (
                  <Text style={styles.modalDescription}>{selectedEvent.description}</Text>
                ) : (
                  <Text style={styles.modalDescription}>No hay descripción disponible.</Text>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
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

  /* Modal styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    maxHeight: "85%",
  },
  closeButton: {
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  closeText: {
    color: lightTheme.colors["primary-purple"],
    fontWeight: "700",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: lightTheme.colors["primary-purple"],
    marginBottom: 8,
  },
  modalMeta: {
    color: lightTheme.colors["dark-gray"],
    marginBottom: 6,
  },
  modalDescription: {
    marginTop: 10,
    lineHeight: 20,
    color: "#333",
  },
  modalImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginTop: 12,
  },
});
