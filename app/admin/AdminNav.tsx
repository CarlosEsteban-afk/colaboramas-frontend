import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../../theme";
import { useRouter, useSegments } from "expo-router";

export default function AdminNav() {
  const router = useRouter();
  const segments = useSegments();

  // Show only when we are under the `admin` segment
  const mainSegment = segments[0] || "";
  if (mainSegment !== "admin") return null;

  const currentRoute = segments[segments.length - 1] || "index";

  const items = [
    { label: "Resumen", icon: "mdi:home-outline", route: "/admin" },
    // use a single-user icon for the Usuarios tab
    { label: "Usuarios", icon: "mdi:account-circle-outline", route: "/admin/users" },
    { label: "Eventos", icon: "mdi:calendar", route: "/admin/events" },
  ];

  const BAR_HEIGHT = Platform.OS === "web" ? 70 : 68;

  return (
    <LinearGradient
      colors={[lightTheme.colors["primary-purple"], lightTheme.colors["primary-pink"]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.bar, { height: BAR_HEIGHT }]}
    >
      {items.map((item, index) => {
        const itemRouteSegment = item.route.split("/").pop() || "";
        const isActive = item.route === "/admin" ? currentRoute === "admin" || currentRoute === "index" : itemRouteSegment === currentRoute;

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.85}
            onPress={() => router.push(item.route as any)}
            style={[
              styles.button,
              isActive && {
                shadowColor: "#000",
                shadowOpacity: 0.25,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 6,
                transform: [{ translateY: -2 }],
              },
            ]}
          >
            <Monicon name={item.icon} size={isActive ? 26 : 22} color={isActive ? lightTheme.colors["green-light"] : "#fff"} />
            <Text style={[styles.label, isActive && { color: lightTheme.colors["green-light"] }]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
  // Keep the nav positioned over the content so it stays visible at the
  // bottom of the screen. Pages add bottom padding so content is not
  // covered by this absolute bar.
  position: Platform.OS === "web" ? "sticky" : "absolute",
  bottom: 0,
  left: 0,
  right: 0,
    zIndex: 9999,
    elevation: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 6,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
    color: "#fff",
  },
});
          