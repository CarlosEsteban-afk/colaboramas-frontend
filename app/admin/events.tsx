import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Alert, Platform, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import { lightTheme } from "../../theme";
import AdminEventCard from "../components/AdminEventCard";
import { useRouter } from "expo-router";
import api from "../../client";

export default function AdminEvents(){
  const router = useRouter();
  const [q, setQ] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const fetchEvents = async () => {
    try {
      const res = await api.get("/admin/events");
      const data = res.data || [];
      const mapped = Array.isArray(data)
        ? data.map((e: any) => ({
            ...e,
            id: String(e.id),
            // normalize image field (backend may return imageUrl or image_url)
            image: e.image ?? e.imageUrl ?? e.image_url,
            // normalize enabled flag (backend may use is_enabled snake_case)
            isEnabled:
              typeof e.is_enabled === "boolean"
                ? e.is_enabled
                : typeof e.isEnabled === "boolean"
                ? e.isEnabled
                : e.status === "approved",
          }))
        : [];
      setEvents(mapped);
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
          imageUrl: undefined,
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
          imageUrl: undefined,
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
          imageUrl: undefined,
        },
      ]);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const toggleBan = async (id: string, currentlyBanned: boolean) => {
    try {
      // Backend expects the ban route under /admin/events/:id/ban
      await api.patch(`/admin/events/${id}/ban`);
      await fetchEvents();
    } catch (e) {
      console.error("Error toggling event ban:", e);
      Alert.alert("Error", "No se pudo actualizar el estado del evento");
    }
  };

  const patchEvent = async (id: string) => {
    Alert.alert('Editar', 'Implementa la edición completa en backend.');
  };

  const types = Array.from(new Set(events.map((ev) => String(ev.type || '').trim()).filter(Boolean)));

  const filtered = events.filter((e) => {
    const title = String(e.title || "").toLowerCase();
    const ql = q.toLowerCase();
    if (!(title.includes(ql) || String(e.description || "").toLowerCase().includes(ql))) return false;

    // filter by type if selected
    if (selectedType) {
      if (String(e.type || '').toLowerCase() !== selectedType.toLowerCase()) return false;
    }

    // filter by active/inactive
    const isEnabled = typeof e.isEnabled === 'boolean' ? e.isEnabled : (e.status === 'approved');
    if (statusFilter === 'active' && !isEnabled) return false;
    if (statusFilter === 'inactive' && isEnabled) return false;

    return true;
  });

  const containerStyle = Platform.OS === 'web' ? { padding: 16, backgroundColor: '#F6F6F6' } : styles.container;

  return (
    <View style={containerStyle}>
      <Text style={styles.title}>Eventos</Text>
      <SearchBar value={q} onChangeText={setQ} placeholder="Buscar por título o descripción" />

      {/* Filters (types + status) grouped so spacing between groups is easy to control */}
      <View style={styles.filtersWrapper}>
        {/* Type filters (horizontal chips) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8, alignItems: 'center' }}
        >
          <Pressable style={[styles.filterChip, selectedType === '' && styles.filterChipActive]} onPress={() => setSelectedType('')}>
            <Text style={[styles.filterChipText, selectedType === '' && styles.filterChipTextActive]}>Todos</Text>
          </Pressable>
          {types.map((t) => (
            <Pressable key={t} style={[styles.filterChip, selectedType === t && styles.filterChipActive]} onPress={() => setSelectedType(t)}>
              <Text style={[styles.filterChipText, selectedType === t && styles.filterChipTextActive]}>{t}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Status filter buttons */}
        <View style={styles.statusRow}>
          <Pressable style={[styles.statusBtn, statusFilter === 'all' && styles.statusBtnActive]} onPress={() => setStatusFilter('all')}>
            <Text style={[styles.statusBtnText, statusFilter === 'all' && styles.statusBtnTextActive]}>Todos</Text>
          </Pressable>
          <Pressable style={[styles.statusBtn, statusFilter === 'active' && styles.statusBtnActive]} onPress={() => setStatusFilter('active')}>
            <Text style={[styles.statusBtnText, statusFilter === 'active' && styles.statusBtnTextActive]}>Activos</Text>
          </Pressable>
          <Pressable style={[styles.statusBtn, statusFilter === 'inactive' && styles.statusBtnActive]} onPress={() => setStatusFilter('inactive')}>
            <Text style={[styles.statusBtnText, statusFilter === 'inactive' && styles.statusBtnTextActive]}>Inactivos</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        style={Platform.OS === 'web' ? undefined : { flex: 1 }}
        data={filtered}
        keyExtractor={(i) => String(i.id)}
  contentContainerStyle={{ paddingVertical: 12, paddingBottom: 140 }}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <AdminEventCard
              event={item}
              // prefer explicit isEnabled from backend, fallback to status
              active={typeof item.isEnabled === 'boolean' ? item.isEnabled : item.status === "approved"}
              onToggleActive={() => toggleBan(item.id, !(typeof item.isEnabled === 'boolean' ? item.isEnabled : item.status === "approved"))}
              onViewDetails={() => router.push((`/admin/event/${item.id}`) as any)}
              onChangeType={async (newType: string) => {
                try {
                  await api.patch(`/admin/events/${item.id}/type`, { type: String(newType).toUpperCase() });
                  await fetchEvents();
                } catch (e) {
                  console.error("Error changing event type:", e);
                  Alert.alert("Error", "No se pudo cambiar el tipo de evento");
                }
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
    ,
    filterChip: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      minWidth: 68,
      minHeight: 32,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#E6DFFF',
      marginRight: 8,
      backgroundColor: '#fff',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterChipActive: { backgroundColor: lightTheme.colors['primary-purple'], borderColor: lightTheme.colors['primary-purple'] },
    filterChipText: { color: '#333', fontWeight: '600' },
    filterChipTextActive: { color: '#fff' },
    statusRow: { flexDirection: 'row', justifyContent: 'flex-start', gap: 8, marginTop: 8, marginBottom: 8, paddingHorizontal: 8 },
    filtersWrapper: { paddingHorizontal: 8, marginBottom: 8, marginTop: 8 },
    statusBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#eee', backgroundColor: '#fff', marginRight: 8 },
    statusBtnActive: { backgroundColor: lightTheme.colors['primary-purple'], borderColor: lightTheme.colors['primary-purple'] },
    statusBtnText: { color: '#333', fontWeight: '700' },
    statusBtnTextActive: { color: '#fff', fontWeight: '700' }
});
