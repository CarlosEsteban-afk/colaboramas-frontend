import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { initI18n } from "../i18n";
import { AuthProvider } from "../providers/AuthProvider";
import { UserProvider } from "../providers/UserProvider";
import { useFonts, CinzelDecorative_400Regular } from "@expo-google-fonts/cinzel-decorative";
import { Lato_400Regular } from "@expo-google-fonts/lato";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    CinzelDecorative_400Regular,
    Lato_400Regular,
  });

  useEffect(() => {
    initI18n();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <UserProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </AuthProvider>
    </UserProvider>
  );
}
