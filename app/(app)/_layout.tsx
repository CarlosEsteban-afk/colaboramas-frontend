import React from "react";
import { View, StyleSheet } from "react-native";
import { Slot, useSegments } from "expo-router";
import BottomBar from "./components/BottomBar";
import TopBar from "./components/TopBar";
import { lightTheme } from "../../theme";

export default function HomeLayout() {
  const segments = useSegments(); 
  const current = segments[segments.length - 1]; 

  const hiddenScreens = ["profile", "login", "editProfile", "contacts", "search", "events", "Settings"];

  const hideTopBar = hiddenScreens.includes(current);

  return (
    <View style={styles.container}>
      {!hideTopBar && <TopBar />}

      <View style={styles.content}>
        <Slot />
      </View>

      <BottomBar />
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
  },
});
