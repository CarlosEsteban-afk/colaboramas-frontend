import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Slot, useSegments } from "expo-router";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import { lightTheme } from "../../theme";

export default function HomeLayout() {
  const segments = useSegments();
  const current = segments[segments.length - 1] || "index";

  const hiddenTopBarScreens = [
    "login",
    "editProfile",
    "events",
    "search",
    "profile",
  ];
  const hideTopBar = hiddenTopBarScreens.includes(current);

  return (
    <View style={styles.container}>
      {/* TopBar */}
      {!hideTopBar && <TopBar />}

      {/* Contenido */}
      <View style={styles.content}>
        <Slot />
      </View>

      {/* BottomBar fijo al fondo */}
      <View style={styles.bottomBar}>
        <BottomBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },
  content: {
    flex: 1,
    paddingBottom: 80,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // Asegura que en Web y móviles se vea siempre
    zIndex: 10,
    ...Platform.select({
      web: { pointerEvents: "auto" },
    }),
  },
});
