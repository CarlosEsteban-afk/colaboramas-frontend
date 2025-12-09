import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../../theme";
import { useRouter } from "expo-router";
import { useBottomBarItems } from "../../src/hooks/useBottomBarItems";

// 🔥 Exportamos la altura real de la barra
export const BOTTOM_BAR_HEIGHT = Platform.OS === "ios" ? 90 : 80;
// (antes eran 64–70; ahora dejamos altura pro + padding)

export default function BottomBar() {
  const router = useRouter();
  const { items, currentRoute } = useBottomBarItems();

  if (items.length === 0) return null;

  return (
    <LinearGradient
      colors={[
        lightTheme.colors["primary-purple"],
        lightTheme.colors["primary-pink"],
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      nativeID="app-bottom-bar"
      style={[styles.bar, { height: BOTTOM_BAR_HEIGHT }]}
    >
      {items.map((item, index) => {
        const isActive = currentRoute.includes(item.route.replace("/", ""));

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

    paddingHorizontal: 10,
    paddingBottom: 20, // ⭐ espacio interno para evitar que queden pegados al borde

    position: Platform.OS === "web" ? "fixed" : "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 6,

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,

    paddingVertical: 6, // más aire entre ícono y texto
  },
  label: {
    fontSize: 12,
    marginTop: 3,
    fontWeight: "600",
    color: "#fff",
  },
});
