import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../../../theme";
import { useRouter, useSegments } from "expo-router";
import { useUser } from "../../../src/hooks/useUser";

export default function BottomBar() {
  const router = useRouter();
  const segments = useSegments();
  const { user } = useUser();

  // último segmento de la ruta actual
  const currentRoute = segments[segments.length - 1] || "home";

  const getHomeRoute = () => {
    if (!user) return "/auth/login";
    if (user.roles?.includes("ACADEMICO")) return "/academico/screens";
    if (user.roles?.includes("COMUNICADOR")) return "/comunicador/screens";
    return "/screens";
  };

  const baseItems = [
    { label: "Inicio", icon: "mdi:home-outline", route: getHomeRoute() },
    { label: "Buscar", icon: "feather:search", route: "/screens/search" },
    {
      label: "Eventos",
      icon: "mdi:calendar",
      route: "/academico/screens/events",
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

  return (
    <LinearGradient
      colors={[
        lightTheme.colors["primary-purple"],
        lightTheme.colors["primary-pink"],
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-row justify-around items-center h-16 px-2"
    >
      {items.map((item, index) => {
        const itemRouteSegment = item.route.split("/").pop();
        const isActive = currentRoute === itemRouteSegment;

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => router.push(item.route as any)}
            className={`flex-1 mx-1 items-center justify-center rounded-xl ${
              isActive ? "shadow-md py-1" : "py-1"
            }`}
          >
            <Monicon
              name={item.icon}
              size={isActive ? 28 : 22}
              color={isActive ? lightTheme.colors["green-light"] : "#fff"}
            />
            <Text
              className={`text-xs mt-1 font-semibold ${
                isActive ? "text-green-400" : "text-white"
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
}
