import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "../../../client";
import { lightTheme } from "../../../theme";

export default function AdminUserDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [roleEdit, setRoleEdit] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await api.get(`/admin/users/${id}`);
        setUser(res.data);
        setRoleEdit(res.data?.roles?.[0] ?? "");
      } catch (e) {
        // fallback mock
        setUser({ id, username: "Usuario", email: "user@example.com", pais: "Chile", ciudad: "Santiago", lineasInteres: ["IA"], proyectosRecientes: ["Proyecto A"], roles:["ACADEMICO"], banned:false });
        setRoleEdit("ACADEMICO");
      }
    })();
  }, [id]);

  const saveRole = async () => {
    try {
      await api.patch(`/admin/users/${id}`, { roles: [roleEdit] });
      Alert.alert("OK", "Rol actualizado");
    } catch (e) {
      Alert.alert("Error", "No se pudo actualizar el rol");
    }
  };

  const toggleBan = async () => {
    try {
      if (user?.banned) {
        await api.post(`/admin/users/${id}/unban`);
      } else {
        await api.post(`/admin/users/${id}/ban`);
      }
      const res = await api.get(`/admin/users/${id}`);
      setUser(res.data);
    } catch (e) {
      Alert.alert("Error", "No se pudo actualizar el estado");
    }
  };

  if (!user) return <Text style={{ padding: 16 }}>Cargando...</Text>;

  return (
  <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 140 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={true} keyboardShouldPersistTaps="handled">
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{user.username ?? user.nombre ?? "Usuario"}</Text>
      <Text style={styles.small}>{user.email}</Text>

      <View style={{ marginTop: 12 }}>
        <Text style={{ fontWeight: "600" }}>Rol</Text>
        <TextInput value={roleEdit} onChangeText={setRoleEdit} style={styles.input} />
        <TouchableOpacity onPress={saveRole} style={[styles.primaryBtn, { marginTop: 8 }]}>
          <Text style={styles.primaryText}>Guardar rol</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 12 }}>
        <TouchableOpacity onPress={toggleBan} style={user.banned ? styles.unbanBtn : styles.banBtn}>
          <Text style={styles.primaryText}>{user.banned ? "Desbanear" : "Banear"}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 18 }}>
        <Text style={{ fontWeight: "600" }}>Información</Text>
        <Text>País: {user.pais}</Text>
        <Text>Ciudad: {user.ciudad}</Text>
        <Text>Intereses: {Array.isArray(user.lineasInteres) ? user.lineasInteres.join(", ") : user.lineasInteres}</Text>
        <Text>Proyectos: {Array.isArray(user.proyectosRecientes) ? user.proyectosRecientes.join(", ") : user.proyectosRecientes}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "700", color: lightTheme.colors["primary-purple"] },
  small: { color: "#666", marginTop: 6 },
  backBtn: { alignSelf: 'flex-start', marginBottom: 10, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: lightTheme.colors['primary-purple'], borderRadius: 8 },
  backText: { color: '#fff', fontWeight: '700' },
  input: { backgroundColor: "#fff", padding: 10, borderRadius: 8, marginTop: 8 },
  primaryBtn: { backgroundColor: lightTheme.colors["primary-purple"], padding: 10, borderRadius: 8, alignItems: "center" },
  primaryText: { color: "#fff", fontWeight: "700" },
  banBtn: { backgroundColor: "#E33", padding: 10, borderRadius: 8, alignItems: "center" },
  unbanBtn: { backgroundColor: "#4CAF50", padding: 10, borderRadius: 8, alignItems: "center" },
});
