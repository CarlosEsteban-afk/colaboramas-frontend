import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Monicon } from "@monicon/native";
import { lightTheme } from "../../theme";
import { useRouter } from "expo-router";
import { useBottomBarItems } from "../../src/hooks/useBottomBarItems";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BAR_HEIGHT = Platform.OS === "web" ? 70 : 64;

export default function BottomBar() {
  const router = useRouter();
  const { items, currentRoute } = useBottomBarItems();
  const insets = useSafeAreaInsets();

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
      style={[styles.bar,
      {
        height: BAR_HEIGHT + insets.bottom,
        paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
      },]}
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
              isActive && styles.activeShadow,
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

    position: Platform.OS === "web" ? "fixed" : "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,

    paddingVertical: 6, // más aire entre ícono y texto
  }, 
  activeShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
    color: "#fff",
  },
});
