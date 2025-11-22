import React, { createContext, useContext } from "react";
import { useFonts, CinzelDecorative_400Regular } from "@expo-google-fonts/cinzel-decorative";
import { Lato_400Regular } from "@expo-google-fonts/lato";

const FontContext = createContext({ loaded: false });

export function FontsProvider({ children }) {
  const [loaded] = useFonts({
    CinzelDecorative_400Regular,
    Lato_400Regular,
  });

  return (
    <FontContext.Provider value={{ loaded }}>
      {loaded ? children : null}
    </FontContext.Provider>
  );
}

export const useFontsLoaded = () => useContext(FontContext);
