import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../../theme";
import { useRouter, useSegments } from "expo-router";

export default function BottomBar() {
  const router = useRouter();
  const segments = useSegments();
  const currentRoute = segments[1] || "home"; 

  const items = [
    { label: "Inicio", icon: "mdi:home-outline", route: "/screens" },
    { label: "Buscar", icon: "feather:search", route: "/screens/search" },
    { label: "Eventos", icon: "mdi:calendar", route: "/screens/events" },
    { label: "Contactos", icon: "fluent:alert-20-regular", route: "/screens/contacts" },
    { label: "Perfil", icon: "mdi:account-circle-outline", route: "/screens/profile" },
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
              size={isActive ? 28 : 22}
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
    height: 60,
    paddingHorizontal: 10,
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
