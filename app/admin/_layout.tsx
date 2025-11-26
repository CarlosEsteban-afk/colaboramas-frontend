import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform } from "react-native";
import { lightTheme } from "../../theme";
import AdminNav from "./AdminNav";
import TopBar from "../components/TopBar";

export default function AdminLayout() {
  // Show a clear development banner when not in production so the admin
  // pages are accessible during development without authentication.
  const isDev = process.env.NODE_ENV !== "production";

  useEffect(() => {
    // On web some wrappers (expo/router or dev overlays) set body { overflow: hidden }
    // which prevents scrolling. Ensure the document body can scroll while on admin pages.
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "auto";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
    return;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <View style={styles.header}>
        <Text style={styles.title}>Panel de administración</Text>
        <Text style={styles.subtitle}>Herramientas de moderación y métricas</Text>
        {isDev ? (
          <View style={styles.devBanner}>
            <Text style={styles.devText}>Modo desarrollo — admin accesible sin token</Text>
          </View>
        ) : null}
      </View>

      {/* Slot occupies the remaining space; pages should manage their own scrolling
          (they mostly use ScrollView/FlatList). Keeping Slot inside a flex:1
          container so inner lists can scroll independently from this layout. */}
      <View style={styles.content}>
        <Slot />
      </View>
      <AdminNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F6F6" },
  // content area that hosts the Slot; inner pages handle their own scrolling.
  // Add bottom padding so the absolute AdminNav doesn't cover content. Do NOT
  // force flex:1 here – letting the content grow lets the browser page scroll
  // naturally on web (fixes wheel/touch scrolling in web mobile view).
  // Increase padding to ensure the bottom nav (≈68px) plus some margin doesn't
  // obscure actionable buttons/cards on small viewports.
  content: { paddingBottom: 140 },
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
