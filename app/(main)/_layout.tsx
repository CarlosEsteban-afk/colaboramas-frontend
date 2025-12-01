import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot, useSegments } from "expo-router";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import { lightTheme } from "../../theme";
import GlobalNotifications from "../components/GlobalNotification";

export default function HomeLayout() {
  const segments = useSegments();
  const current = segments[segments.length - 1] || "index";

  const hiddenTopBarScreens = [
    "login",
    "editProfile",
    "events",
    "search",
    "profile",
    "Settings",
    "contacts"
  ];

  const hideTopBar = hiddenTopBarScreens.includes(current);

  return (
    <SafeAreaView style={styles.safeContainer}>
      {!hideTopBar && <TopBar />}

      <View style={styles.content}>
        <Slot />
      </View>

      <View style={styles.bottomBar}>
        <BottomBar />
      </View>
      <GlobalNotifications />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },
  content: {
    flex: 1,
    paddingBottom: 25, // espacio para la BottomBar
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    ...Platform.select({
      web: { pointerEvents: "auto" },
    }),
  },
});
