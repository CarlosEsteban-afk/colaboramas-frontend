import React from "react";
import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import BottomBar from "../components/BottomBar";
import { lightTheme } from "../../theme";

export const unstable_settings = {
  headerShown: false,
};

export default function HomeLayout() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <Slot />
        </View>
        <BottomBar />
      </View>
    </>
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
