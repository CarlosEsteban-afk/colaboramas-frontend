import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Monicon } from "@monicon/native";
import { useRouter, useSegments } from "expo-router";
import { lightTheme } from "../theme";

export default function BottomBar() {
  const router = useRouter();
  const segments = useSegments();
  const currentRoute = segments[1] || "index"; // ejemplo: home/index

  const items = [
    { label: "Inicio", icon: "material-symbols:home-outline-rounded", route: "/home" },
    { label: "Buscar", icon: "heroicons:magnifying-glass", route: "/home/search" },
    { label: "Eventos", icon: "material-symbols:calendar-today-outline", route: "/home/events" },
    { label: "Contactos", icon: "material-symbols-light:connect-without-contact", route: "/home/contacts" },
    { label: "Perfil", icon: "material-symbols:account-circle-full", route: "/home/profile" },
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
      {items.map((item, index) => {
        const isActive = currentRoute === item.route.split("/").pop();
        return (
          <TouchableOpacity
            key={index}
            style={styles.item}
            activeOpacity={0.8}
            onPress={() => router.push(item.route)}
          >
            <Monicon
              name={item.icon}
              size={22}
              color={isActive ? lightTheme.colors["green-light"] : "#fff"}
            />
            <Text
              style={[
                styles.label,
                { color: isActive ? lightTheme.colors["green-light"] : "#fff" },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
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
    marginTop: 2,
  },
});
