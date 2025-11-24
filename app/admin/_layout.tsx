import React from "react";
import { Slot } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { lightTheme } from "../../theme";
import AdminNav from "./AdminNav";
import TopBar from "../components/TopBar";

export default function AdminLayout() {
  // Show a clear development banner when not in production so the admin
  // pages are accessible during development without authentication.
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.title}>Panel de administración</Text>
          <Text style={styles.subtitle}>Herramientas de moderación y métricas</Text>
          {isDev ? (
            <View style={styles.devBanner}>
              <Text style={styles.devText}>Modo desarrollo — admin accesible sin token</Text>
            </View>
          ) : null}
        </View>

        <Slot />
      </ScrollView>
      <AdminNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F6F6" },
  inner: { paddingBottom: 120 },
  header: { padding: 14, borderBottomWidth: 1, borderColor: "#eee", backgroundColor: "#fff", alignItems: 'flex-start' },
  title: {
    color: lightTheme.colors["primary-purple"],
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: { color: lightTheme.colors["dark-gray"], fontSize: 12, marginTop: 4 },
  devBanner: {
    marginTop: 10,
    backgroundColor: "#ffe9ee",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  devText: { color: lightTheme.colors["primary-purple"], fontWeight: "700" },
});
