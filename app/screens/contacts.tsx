import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme";
import ContactsTab from "../components/ContactsTab";

export default function ContactsScreen() {
  const [tab, setTab] = useState<"recibidas" | "enviadas" | "contestadas">("recibidas");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contactos</Text>
      <Text style={styles.text}>Gestiona tus solicitudes de contacto.</Text>

      {/* 🔹 Barra con gradiente e inner shadow simulado */}
      <LinearGradient
        colors={[
          lightTheme.colors["primary-purple"],
          lightTheme.colors["primary-pink"],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.tabBar}
      >
        {/* Capa interior para efecto de sombra interna */}
        <View style={styles.innerShadow} pointerEvents="none" />

        {["recibidas", "enviadas", "contestadas"].map((t) => {
          const active = tab === t;
          return (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t as any)}
              activeOpacity={1}
              style={[styles.tabButton, active && styles.tabButtonActive]}
            >
              <Text
                style={[
                  styles.tabText,
                  active ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>

      <ScrollView
        style={{ width: "90%" }}
        contentContainerStyle={{ paddingVertical: 16, gap: 12, paddingBottom: 100 }}
      >
        <ContactsTab type={tab} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: lightTheme.colors["primary-purple"],
  },
  text: {
    color: lightTheme.colors["dark-gray"],
    marginBottom: 20,
  },
  tabBar: {
    flexDirection: "row",
    width: "90%",
    borderRadius: 6,
    justifyContent: "space-between",
    marginBottom: 20,
    overflow: "hidden", // 🔸 necesario para que la sombra quede dentro
  },
  innerShadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: lightTheme.colors["primary-purple"],
    opacity: 0.01
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "transparent",
  },
  tabButtonActive: {
    backgroundColor: lightTheme.colors["dark-gray"],
    opacity: 0.6,
    borderRadius: 0,

  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#FFF",
    fontWeight: "700"
  },
  tabTextInactive: {
    color: "#fff",
  },
});
