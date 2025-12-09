import React, { useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot, useSegments } from "expo-router";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import { lightTheme } from "../../theme";
//import GlobalNotifications from "../components/GlobalNotification";

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

  // Ensure the page can scroll on web: some dev overlays or wrappers set
  // `body { overflow: hidden }` which prevents scrolling — restore it while
  // this layout is mounted and revert on unmount.
  useEffect(() => {
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
    <SafeAreaView style={styles.safeContainer}>
      {!hideTopBar && <TopBar />}

      <View style={styles.content}>
        <Slot />
      </View>

      <BottomBar />
      {/*<GlobalNotifications />*/}
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
  },
  bottomBar: {
    // kept for reference; BottomBar handles its own positioning (fixed on web)
    height: Platform.OS === "web" ? 70 : 64,
  },
});
