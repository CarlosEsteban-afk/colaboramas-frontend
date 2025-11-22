// app/_layout.tsx
import { Slot } from "expo-router";
import { AuthProvider } from "../src/providers/AuthProvider";
import { UserProvider } from "../src/providers/UserProvider";
import { FontsProvider } from "../src/providers/FontsProvider";
import React, { useEffect } from "react";
import {
  CinzelDecorative_400Regular,
  useFonts,
} from "@expo-google-fonts/cinzel-decorative";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import { initI18n } from "../i18n";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    CinzelDecorative_400Regular,
    Lato_400Regular,
  });

  useEffect(() => {
    initI18n();
  }, []);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <FontsProvider>
      <UserProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </UserProvider>
    </FontsProvider>
  );
}
