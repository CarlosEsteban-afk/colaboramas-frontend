import { View } from "react-native";
import { Slot } from "expo-router";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../theme";
import { AuthProvider } from "./context/AuthContext";

export default function AuthLayout() {
  return (
    // eslint-disable-next-line react/no-children-prop
    <AuthProvider children={""}>
      <LinearGradient
        colors={[lightTheme.colors["primary-pink"], lightTheme.colors["primary-purple"]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: "center" }}>
          <Slot />
        </View>
      </LinearGradient>
    </AuthProvider>
  );
}
