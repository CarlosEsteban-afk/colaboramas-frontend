import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { lightTheme } from "../../theme";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";

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
    Alert.alert(
      u.banned ? "Desbanear usuario" : "Banear usuario",
      `¿Confirma que desea ${u.banned ? "desbanear" : "banear"} a ${u.name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Aceptar",
          onPress: () => {
            setUsers((prev) => prev.map((p) => (p.id === u.id ? { ...p, banned: !p.banned } : p)));
          },
        },
      ],
    );
  };

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()) || u.country.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios</Text>
      <SearchBar value={q} onChangeText={setQ} placeholder="Buscar por nombre, email o país" />

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <UserCard name={item.name} title={item.role} location={`${item.country}`} tags={[]} imageUrl={undefined} />

            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.viewBtn} onPress={() => router.push(`/admin/user/${item.id}`)}>
                <Text style={styles.viewText}>Ver</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.banBtn, item.banned ? styles.unban : null]} onPress={() => onBanToggle(item)}>
                <Text style={styles.banText}>{item.banned ? "Desbanear" : "Banear"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F6F6F6" },
  title: { fontSize: 20, fontWeight: "700", color: lightTheme.colors["primary-purple"], marginBottom: 8 },
  card: { backgroundColor: "transparent", marginBottom: 12 },
  actionsRow: { flexDirection: "row", justifyContent: "center", gap: 8, marginTop: 8 },
  viewBtn: { paddingVertical: 6, paddingHorizontal: 10, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", borderRadius: 8, marginRight: 8 },
  viewText: { color: lightTheme.colors["primary-purple"], fontWeight: "700" },
  banBtn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#E33", borderRadius: 8 },
  banText: { color: "#fff", fontWeight: "700" },
  unban: { backgroundColor: "#4CAF50" },
});
