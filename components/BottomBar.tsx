import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function BottomBar() {
  const items = [
  ];

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.item}>
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#7B2FF7",
    paddingVertical: 10,
    justifyContent: "space-around",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  item: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#fff",
    marginTop: 2,
  },
});
