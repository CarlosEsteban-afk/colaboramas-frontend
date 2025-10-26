import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomBar from "../../components/BottomBar";
import SearchBar from "../../components/SearchBar";
import { lightTheme } from "../../theme";

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>
      <Text style={styles.text}>Próximas actividades y eventos</Text>
      <SearchBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "top", alignItems: "center", padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: lightTheme.colors["primary-purple"],
  },
  text: { color: lightTheme.colors["dark-gray"], marginBottom: 20 },
});
