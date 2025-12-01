import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { lightTheme } from "../../theme";
import SearchBar from "../components/SearchBar";
import AdminUserCard from "../components/AdminUserCard";

type User = { id: string; name: string; email: string; country: string; role: string; banned?: boolean };

const MOCK: User[] = [
  { id: "1", name: "Ana Pérez", email: "ana@uni.cl", country: "Chile", role: "Investigador" },
  { id: "2", name: "Luis Gómez", email: "luis@uni.ar", country: "Argentina", role: "Comunicador", banned: true },
  { id: "3", name: "María Ruiz", email: "mruiz@uni.pe", country: "Perú", role: "Investigador" },
];

export default function AdminUsers() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<User[]>(MOCK);

  useEffect(() => {
    // keep MOCK for dev; if backend exists, fetch here
  }, []);

  const onBanToggle = (u: User) => {
    // Toggle immediately without confirmation so the card updates instantly.
    setUsers((prev) => prev.map((p) => (p.id === u.id ? { ...p, banned: !p.banned } : p)));
  };

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()) || u.country.toLowerCase().includes(q.toLowerCase()),
  );

  const containerStyle = Platform.OS === 'web' ? { padding: 16, backgroundColor: '#F6F6F6' } : styles.container;

  return (
    <View style={containerStyle}>
      <Text style={styles.title}>Usuarios</Text>
      <SearchBar value={q} onChangeText={setQ} placeholder="Buscar por nombre, email o país" />

      {Platform.OS === 'web' ? (
  <ScrollView contentContainerStyle={{ paddingVertical: 12, paddingBottom: 140 }} showsVerticalScrollIndicator={true}>
          {filtered.map((item) => (
            <View key={item.id} style={styles.card}>
              <AdminUserCard
                name={item.name}
                title={item.role}
                role={String(item.role).toLowerCase() === "comunicador" ? "comunicador" : "investigador"}
                banned={!!item.banned}
                location={`${item.country}`}
                tags={[]}
                imageUrl={undefined}
                onToggleRole={() => {
                  setUsers((prev) => prev.map((p) => (p.id === item.id ? { ...p, role: p.role === "Comunicador" || p.role === "comunicador" ? "Investigador" : "Comunicador" } : p)));
                }}
                onToggleBan={() => onBanToggle(item)}
                onViewDetails={() => router.push(`/admin/user/${item.id}`)}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={filtered}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingVertical: 12, paddingBottom: 100 }}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
          // Diagnostic: log layout (visible area) and content size in web
          onLayout={(e) => console.log('[DIAG] FlatList layout:', e.nativeEvent.layout)}
          onContentSizeChange={(w, h) => console.log('[DIAG] FlatList contentSize:', { width: w, height: h })}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <AdminUserCard
                name={item.name}
                title={item.role}
                role={String(item.role).toLowerCase() === "comunicador" ? "comunicador" : "investigador"}
                banned={!!item.banned}
                location={`${item.country}`}
                tags={[]}
                imageUrl={undefined}
                onToggleRole={() => {
                  setUsers((prev) => prev.map((p) => (p.id === item.id ? { ...p, role: p.role === "Comunicador" || p.role === "comunicador" ? "Investigador" : "Comunicador" } : p)));
                }}
                onToggleBan={() => onBanToggle(item)}
                onViewDetails={() => router.push(`/admin/user/${item.id}`)}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F6F6F6" },
  title: { fontSize: 20, fontWeight: "700", color: lightTheme.colors["primary-purple"], marginBottom: 8 },
  card: { backgroundColor: "transparent", marginBottom: 12 },
  actionsRow: { flexDirection: "row", justifyContent: "center", gap: 8, marginTop: 8, marginBottom: 8 },
  actionBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, marginHorizontal: 8, minWidth: 100, alignItems: 'center' },
  actionText: { color: '#222', fontWeight: '700' },
  primary: { backgroundColor: lightTheme.colors["primary-purple"] },
  primaryText: { color: '#fff' },
  warn: { backgroundColor: '#E33' },
  warnText: { color: '#fff' },
  unban: { backgroundColor: '#4CAF50' },
  unbanText: { color: '#fff' },
});
