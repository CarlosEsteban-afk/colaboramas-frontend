import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { lightTheme } from "../../theme";
import SearchBar from "../components/SearchBar";
import AdminUserCard from "../components/AdminUserCard";
import api from "../../client";

type User = { id: string; name: string; email: string; country: string; role: string; banned?: boolean; imageUrl?: string };

export default function AdminUsers() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Debug: verify authenticated user and roles from current token
  useEffect(() => {
    (async () => {
      try {
        const me = await api.get("/auth/me");
        console.debug('[auth/me]', me.data);
      } catch (err) {
        console.debug('[auth/me] error', err?.response?.status, err?.response?.data || err);
      }
    })();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      const usersData = res.data || [];
      // Map backend user data to our User type
      const mappedUsers: User[] = usersData.map((u: any) => {
        let roleVal: any = Array.isArray(u.roles) ? u.roles[0] : u.roles || "ACADEMICO";
        if (roleVal && typeof roleVal === "object") {
          // common server shape: { id, roleName, permissionEntities }
          roleVal = roleVal.roleName || roleVal.name || String(roleVal);
        }
        return {
          id: String(u.id),
          name: u.username || u.nombre || "Usuario",
          email: u.email || "",
          country: u.pais || u.country || "",
          role: String(roleVal ?? "ACADEMICO"),
          // backend uses `isEnabled` — derive `banned` as inverse of isEnabled when available
          banned: typeof u.isEnabled === 'boolean' ? !u.isEnabled : (u.banned || false),
          imageUrl: u.imageUrl || (u.image && (u.image.url || u.image)) || u.profileImage || u.avatar || undefined,
        };
      });
      setUsers(mappedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Fallback to mock data
      setUsers([
        { id: "1", name: "Ana Pérez", email: "ana@uni.cl", country: "Chile", role: "Investigador" },
        { id: "2", name: "Luis Gómez", email: "luis@uni.ar", country: "Argentina", role: "Comunicador", banned: true },
        { id: "3", name: "María Ruiz", email: "mruiz@uni.pe", country: "Perú", role: "Investigador" },
      ]);
    }
  };

  const onBanToggle = async (u: User) => {
    try {
      // Debug: show if Authorization header is present on the client defaults
      console.debug('[admin] toggleBan headers:', api.defaults.headers.common?.Authorization ? 'present' : 'missing');
      // Call API and use returned user to update local state so the card doesn't disappear
      const res = await api.patch(`/admin/users/${u.id}/ban`);
      const updated = res.data;
      // Debug: log PATCH response so we can see server-side fields (isEnabled etc.)
      console.debug('[admin] PATCH /admin/users/{id}/ban response:', updated);

      // derive banned from response (server uses isEnabled)
      const updatedBanned = typeof updated.isEnabled === 'boolean' ? !updated.isEnabled : (updated.banned || false);
      setUsers((prev) => prev.map((pu) => (String(pu.id) === String(updated.id) ? { ...pu, banned: updatedBanned } : pu)));

      // Verify server state by fetching the single user resource and logging it
      try {
        const fresh = await api.get(`/admin/users/${u.id}`);
        console.debug('[admin] GET /admin/users/{id} after PATCH:', fresh.data);
      } catch (getErr) {
        console.debug('[admin] failed to GET user after PATCH', getErr?.response?.status || getErr);
      }
    } catch (error) {
      console.error("Error toggling ban:", error);
      Alert.alert("Error", "No se pudo actualizar el estado del usuario");
    }
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
                imageUrl={item.imageUrl}
                onToggleRole={async () => {
                  const currentRole = String(item.role).toUpperCase();
                  const newRole = currentRole === "COMUNICADOR" ? "ACADEMICO" : "COMUNICADOR";
                  try {
                    console.debug('[admin] changeRole headers:', api.defaults.headers.common?.Authorization ? 'present' : 'missing');
                    await api.patch(`/admin/changeUserRole/${item.id}`, { role: newRole });
                    await fetchUsers();
                  } catch (error) {
                    console.error("Error changing role:", error);
                    Alert.alert("Error", "No se pudo cambiar el rol");
                  }
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
                imageUrl={item.imageUrl}
                onToggleRole={async () => {
                  const currentRole = String(item.role).toUpperCase();
                  const newRole = currentRole === "COMUNICADOR" ? "ACADEMICO" : "COMUNICADOR";
                  try {
                    await api.patch(`/admin/changeUserRole/${item.id}`, { role: newRole });
                    await fetchUsers();
                  } catch (error) {
                    console.error("Error changing role:", error);
                    Alert.alert("Error", "No se pudo cambiar el rol");
                  }
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
