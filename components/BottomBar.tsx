import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../theme"; // ajusta la ruta según tu proyecto

export default function BottomBar() {
  const items = [
    { label: "Inicio" },
    { label: "Buscar" },
    { label: "Eventos" },
    { label: "Notificaciones" },
    { label: "Perfil" },
  ];

  return (
    <LinearGradient
      colors={[
        lightTheme.colors["primary-purple"],
        lightTheme.colors["primary-pink"],
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          activeOpacity={0.8}
        >
          {/* 🔜 Icono (ejemplo futuro)
          <Iconify icon="mdi:home-outline" size={24} color="#fff" /> */}
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 16,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: "#fff",
    marginTop: 2,
  },
});
