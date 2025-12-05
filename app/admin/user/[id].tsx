import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, ScrollView, Image, Modal, Pressable, ScrollView as RNScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "../../../client";
import { lightTheme } from "../../../theme";
import { LinearGradient } from "expo-linear-gradient";

export default function AdminUserDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [roleEdit, setRoleEdit] = useState("");
  const [roleModalVisible, setRoleModalVisible] = useState(false);

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
      // refresh
      const res = await api.get(`/admin/users/${id}`);
      setUser(res.data);
    } catch (e) {
      Alert.alert("Error", "No se pudo actualizar el rol");
    }
  };

  const toggleBan = async () => {
    try {
      if (user?.banned || !user?.isEnabled) {
        await api.patch(`/admin/users/${id}/ban`);
      } else {
        await api.patch(`/admin/users/${id}/ban`);
      }
      const res = await api.get(`/admin/users/${id}`);
      setUser(res.data);
      Alert.alert('Éxito', 'Estado actualizado correctamente');
    } catch (e) {
      Alert.alert("Error", "No se pudo actualizar el estado");
    }
  };

  const onChangeRole = async (newRole: string) => {
    setRoleEdit(newRole);
    try {
      await api.patch(`/admin/changeUserRole/${id}`, { role: newRole });
      const res = await api.get(`/admin/users/${id}`);
      setUser(res.data);
      Alert.alert('Éxito', 'Rol actualizado correctamente');
    } catch (e) {
      Alert.alert('Error', 'No se pudo actualizar el rol');
    }
  };

  if (!user) return <Text style={{ padding: 16 }}>Cargando...</Text>;

  // header color
  const headerColor = lightTheme.colors["primary-purple"];

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 140 }} keyboardShouldPersistTaps="handled">
      <LinearGradient colors={[headerColor, `${headerColor}CC`]} style={styles.header}>
        <Text style={styles.headerTitle}>{user.username ?? user.nombre ?? "Usuario"}</Text>
        <Text style={styles.headerSubtitle}>{user.roles ? (Array.isArray(user.roles) ? String(user.roles?.[0]) : String(user.roles)) : ""} • {user.email}</Text>
      </LinearGradient>

      <View style={styles.card}>
        <View style={styles.imageContainerCard}>
          {user.imageUrl ? (
            <Image source={{ uri: user.imageUrl }} style={styles.cardImage} resizeMode="cover" />
          ) : (
            <View style={styles.cardImagePlaceholder}>
              <Text style={styles.cardImagePlaceholderText}>Foto</Text>
            </View>
          )}
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>Rol</Text>
          <Text style={styles.value}>{Array.isArray(user.roles) ? String(user.roles?.[0]) : String(user.roles)}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>País</Text>
          <Text style={styles.value}>{user.pais}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>Ciudad</Text>
          <Text style={styles.value}>{user.ciudad}</Text>
        </View>

        <Text style={styles.label}>Motivaciones</Text>
        <Text style={styles.description}>{user.motivaciones}</Text>

        <Text style={styles.label}>Actividades personales</Text>
        <Text style={styles.description}>{user.actividadesPersonales}</Text>

        <Text style={styles.label}>Proyectos recientes</Text>
        <Text style={styles.description}>{user.proyectosRecientes}</Text>

        <View style={styles.actionsRowSingle}>
          <TouchableOpacity style={[styles.actionBtn, user?.isEnabled ? styles.activeBtn : styles.inactiveBtn]} onPress={toggleBan}>
            <Text style={[styles.actionText, styles.primaryText]}>{user?.isEnabled ? "Activo" : "Inactivo"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: headerColor }]} onPress={() => setRoleModalVisible(true)}>
            <Text style={[styles.actionText, styles.primaryText]}>Editar rol</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={roleModalVisible} transparent animationType="fade" onRequestClose={() => setRoleModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Seleccionar rol</Text>
              <RNScrollView>
                {["ADMIN","ACADEMICO","MODERATOR","USER"].map((r) => (
                  <Pressable key={r} style={[styles.modalOption, r === roleEdit ? styles.modalOptionActive : undefined]} onPress={() => { setRoleModalVisible(false); onChangeRole(r); }}>
                    <Text style={styles.modalOptionText}>{r}</Text>
                  </Pressable>
                ))}
              </RNScrollView>
              <Pressable style={styles.modalClose} onPress={() => setRoleModalVisible(false)}>
                <Text style={styles.modalCloseText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 140, backgroundColor: '#F6F6F6' },
  header: { paddingTop: 56, paddingBottom: 20, paddingHorizontal: 20 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: '800' },
  headerSubtitle: { color: '#fff', marginTop: 6 },
  card: { margin: 16, padding: 16, borderRadius: 10, backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  imageContainerCard: { width: '100%', height: 140, borderRadius: 8, overflow: 'hidden', marginBottom: 12, backgroundColor: '#eee' },
  cardImage: { width: '100%', height: '100%' },
  cardImagePlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f3f3' },
  cardImagePlaceholderText: { color: '#888', fontWeight: '700' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  label: { fontSize: 13, color: '#333', fontWeight: '700', marginTop: 6 },
  value: { fontSize: 14, color: '#222', fontWeight: '600' },
  description: { marginTop: 8, color: '#333', lineHeight: 20 },
  actionsRowSingle: { marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  actionBtn: { flex: 1, borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginHorizontal: 4 },
  actionText: { color: '#222', fontWeight: '700' },
  primaryText: { color: '#fff', fontWeight: '700' },
  activeBtn: { backgroundColor: '#4CAF50' },
  inactiveBtn: { backgroundColor: '#e74c3c' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '100%', maxWidth: 480, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' },
  modalTitle: { fontWeight: '700', fontSize: 16, padding: 14, backgroundColor: '#fff' },
  modalOption: { paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
  modalOptionActive: { backgroundColor: '#f0f6ff' },
  modalOptionText: { fontSize: 14, color: '#222' },
  modalClose: { padding: 12, alignItems: 'center', backgroundColor: '#fff' },
  modalCloseText: { color: '#2b2b2b', fontWeight: '700' },
  /* legacy styles kept for compatibility */
  title: { fontSize: 20, fontWeight: '700', color: lightTheme.colors['primary-purple'] },
  small: { color: '#666', marginTop: 6 },
  backBtn: { alignSelf: 'flex-start', marginBottom: 10, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: lightTheme.colors['primary-purple'], borderRadius: 8 },
  backText: { color: '#fff', fontWeight: '700' },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginTop: 8 },
  primaryBtn: { backgroundColor: lightTheme.colors['primary-purple'], padding: 10, borderRadius: 8, alignItems: 'center' },
  banBtn: { backgroundColor: '#E33', padding: 10, borderRadius: 8, alignItems: 'center' },
  unbanBtn: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 8, alignItems: 'center' },
});
