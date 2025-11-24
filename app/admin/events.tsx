import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Alert } from "react-native";
import { lightTheme } from "../../theme";
import EventCard from "../components/EventCard";

export default function AdminEvents(){
  const [events, setEvents] = useState<any[]>([]);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/admin/events");
      setEvents(res.data || []);
    } catch (e) {
      setEvents([
        { id: 'e1', title: 'Congreso Rehab', date: '2025-10-24', country: 'Chile', status: 'pending' },
        { id: 'e2', title: 'Charla IA', date: '2025-10-10', country: 'Perú', status: 'approved' },
      ]);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const toggleBan = async (id: string, currentlyBanned: boolean) => {
    try {
      if (currentlyBanned) await api.post(`/admin/events/${id}/unban`);
      else await api.post(`/admin/events/${id}/ban`);
      fetchEvents();
    } catch (e) {
      Alert.alert('Error', 'No se pudo actualizar el evento');
    }
  };

  const patchEvent = async (id: string) => {
    Alert.alert('Editar', 'Implementa la edición completa en backend.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>

      <FlatList
        data={events}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <EventCard event={item} />

            <View style={styles.actions}>
              <Pressable style={styles.actionBtn} onPress={() => patchEvent(item.id)}>
                <Text style={styles.actionText}>Editar</Text>
              </Pressable>

              <Pressable style={[styles.actionBtn, styles.warn]} onPress={() => toggleBan(item.id, !!item.banned)}>
                <Text style={styles.actionText}>{item.status === "pending" ? "Aprobar" : "Banear"}</Text>
              </Pressable>
            </View>
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
  name:{ fontWeight:'700' },
  small:{ color:'#666', marginTop:4 },
  actions:{ flexDirection:'row' },
  btn:{ paddingVertical:8, paddingHorizontal:12, borderRadius:8, marginLeft:8, backgroundColor: lightTheme.colors['primary-pink'] },
  btnText:{ color:'#fff', fontWeight:'700' }
});
