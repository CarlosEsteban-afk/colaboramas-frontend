import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../../theme";
import { useRouter, useSegments } from "expo-router";
import { useUser } from "../../src/hooks/useUser";

export default function BottomBar() {
  const router = useRouter();
  const segments = useSegments();
  const { user } = useUser();

  const mainSegment = segments[0] || "";
  if (!user || !["academico", "comunicador"].includes(mainSegment)) return null;

  const currentRoute = segments[segments.length - 1] || "index";

  const getHomeRoute = () => {
    if (!user) return "/auth/login";
    if (user.roles?.includes("ACADEMICO")) return "/academico";
    if (user.roles?.includes("COMUNICADOR")) return "/comunicador";
    return "/screens";
  };

  const baseItems = [
    { label: "Inicio", icon: "mdi:home-outline", route: getHomeRoute() },
    { label: "Buscar", icon: "feather:search", route: "/screens/search" },
    {
      label: "Eventos",
      icon: "mdi:calendar",
      route: "/academico/events",
      role: "ACADEMICO",
    },
    {
      label: "Contactos",
      icon: "fluent:alert-20-regular",
      route: "/screens/contacts",
    },
    {
      label: "Perfil",
      icon: "mdi:account-circle-outline",
      route: "/screens/profile",
    },
  ];

  const items = baseItems.filter((item) => {
    if (!item.role) return true;
    return user?.roles?.includes(item.role);
  });

  const BAR_HEIGHT = Platform.OS === "web" ? 70 : 64;

  return (
    <LinearGradient
      colors={[
        lightTheme.colors["primary-purple"],
        lightTheme.colors["primary-pink"],
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.bar, { height: BAR_HEIGHT }]}
    >
      {items.map((item, index) => {
        const itemRouteSegment = item.route.split("/").pop() || "";
        const isActive =
          itemRouteSegment === currentRoute || item.route === getHomeRoute();

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => router.push(item.route as any)}
            style={[
              styles.button,
              isActive && {
                shadowColor: "#000",
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
              },
            ]}
          >
            <Monicon
              name={item.icon}
              size={isActive ? 28 : 22}
              color={isActive ? lightTheme.colors["green-light"] : "#fff"}
            />
            <Text
              style={[
                styles.label,
                isActive && { color: lightTheme.colors["green-light"] },
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
  bar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
    position: Platform.OS === "web" ? "sticky" : "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 4,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
    color: "#fff",
  },
});
