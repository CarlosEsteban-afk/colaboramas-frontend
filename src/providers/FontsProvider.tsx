// src/providers/FontsProvider.tsx
import React, { createContext, useContext } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";

import { CinzelDecorative_400Regular } from "@expo-google-fonts/cinzel-decorative";
import { Lato_400Regular } from "@expo-google-fonts/lato";

SplashScreen.preventAutoHideAsync();

// ---- CONTEXT ----
const FontsContext = createContext(false);

export const FontsProvider = ({ children }) => {
  const [loaded] = useFonts({
    CinzelDecorative_400Regular,
    Lato_400Regular,
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  SplashScreen.hideAsync();

  return (
    <FontsContext.Provider value={loaded}>{children}</FontsContext.Provider>
  );
};

// ---- HOOK ----
export const useFontsLoaded = () => {
  return useContext(FontsContext);
};
