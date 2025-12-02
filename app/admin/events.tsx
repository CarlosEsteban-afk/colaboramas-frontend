import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Alert, Platform } from "react-native";
import { lightTheme } from "../../theme";
import AdminEventCard from "../components/AdminEventCard";
import { useRouter } from "expo-router";
import api from "../../client";

export default function AdminEvents(){
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/admin/events");
      setEvents(res.data || []);
    } catch (e) {
      // Mock data that matches backend Event model
      setEvents([
        {
          id: 'e1',
          title: 'Congreso: 2do Congreso Internacional de Ciencias de la Rehabilitación',
          type: 'Congreso',
          date: '2025-10-24T09:00:00',
          place: 'Santiago, Chile',
          ubication: 'Santiago, Chile',
          description: 'Congreso centrado en avances en rehabilitación y prácticas basadas en evidencia.',
          isEnabled: false,
          status: 'pending',
          image: undefined,
        },
        {
          id: 'e2',
          title: 'Charla: Introducción a IA aplicada a la salud',
          type: 'Charla',
          date: '2025-10-10T18:30:00',
          place: 'Lima, Perú',
          ubication: 'Lima, Perú',
          description: 'Charla corta sobre aplicaciones prácticas de IA en entornos clínicos.',
          isEnabled: true,
          status: 'approved',
          image: undefined,
        },
        {
          id: 'e3',
          title: 'Concurso: Hackathon Salud 2025',
          type: 'Concurso',
          date: '2025-11-05T09:00:00',
          place: 'Medellín, Colombia',
          ubication: 'Medellín, Colombia',
          description: 'Concurso de soluciones tecnológicas para mejora de procesos clínicos.',
          isEnabled: true,
          status: 'approved',
          image: undefined,
        },
        {
          id: 'e4',
          title: 'Conferencia: Avances en Neurociencia y Rehabilitación',
          type: 'Conferencia',
          date: '2026-02-14T10:00:00',
          place: 'Buenos Aires, Argentina',
          ubication: 'Buenos Aires, Argentina',
          description: 'Conferencia internacional que reúne investigadores en neurociencia aplicada.',
          isEnabled: false,
          status: 'pending',
          image: undefined,
        },
      ]);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const toggleBan = async (id: string, currentlyBanned: boolean) => {
    try {
      // try backend call; if API not available we'll optimistically update local state
      if (typeof api !== "undefined") {
        if (currentlyBanned) await api.post(`/admin/events/${id}/unban`);
        else await api.post(`/admin/events/${id}/ban`);
        fetchEvents();
        return;
      }
    } catch (e) {
      // ignore and fallback to local update
    }

    // local fallback: toggle status between 'approved' and 'pending'
    setEvents((prev) => prev.map((p) => (p.id === id ? { ...p, status: p.status === "approved" ? "pending" : "approved" } : p)));
  };

  const patchEvent = async (id: string) => {
    Alert.alert('Editar', 'Implementa la edición completa en backend.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>

      <FlatList
        style={Platform.OS === 'web' ? undefined : { flex: 1 }}
        data={events}
        keyExtractor={(i) => String(i.id)}
  contentContainerStyle={{ paddingVertical: 12, paddingBottom: 140 }}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <AdminEventCard
              event={item}
              active={item.status === "approved"}
              onToggleActive={() => toggleBan(item.id, item.status !== "approved")}
              onViewDetails={() => router.push((`/admin/event/${item.id}`) as any)}
              onChangeType={(newType: string) => {
                // optimistic local update
                setEvents((prev) => prev.map((p) => (p.id === item.id ? { ...p, type: newType } : p)));
                // try to persist to backend if available
                (async () => {
                  try {
                    if (typeof api !== "undefined") await api.patch(`/admin/events/${item.id}`, { type: newType });
                  } catch (e) {
                    // ignore or revert if you want
                  }
                })();
              }}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:16, backgroundColor: '#F6F6F6' },
  title:{ fontSize:20, fontWeight:'700', marginBottom:8, color: lightTheme.colors['primary-purple'] },
  row:{ flexDirection:'row', alignItems:'center', padding:12, backgroundColor:'#fff', borderRadius:8, marginBottom:8 },
  item: { marginBottom: 12 },
  name:{ fontWeight:'700' },
  small:{ color:'#666', marginTop:4 },
  actions:{ flexDirection:'row' },
  actionBtn: { paddingVertical:8, paddingHorizontal:12, borderRadius:8, marginLeft:8, minWidth:90, alignItems:'center' },
  actionText: { color:'#222', fontWeight:'700' },
  primary: { backgroundColor: lightTheme.colors['primary-purple'] },
  primaryText: { color: '#fff' },
  approve: { backgroundColor: '#4CAF50' },
  approveText: { color: '#fff' },
  warn: { backgroundColor: '#E33' }
});
