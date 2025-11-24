import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";

import {
  CinzelDecorative_400Regular,
} from "@expo-google-fonts/cinzel-decorative";

import {
  Lato_400Regular,
} from "@expo-google-fonts/lato";

SplashScreen.preventAutoHideAsync();

export const FontsProvider = ({ children }) => {
  const [loaded] = useFonts({
    CinzelDecorative_400Regular,
    Lato_400Regular,
  });
  console.log("Fuentes cargadas?");
  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  SplashScreen.hideAsync();

  return <>{children}</>;
};
