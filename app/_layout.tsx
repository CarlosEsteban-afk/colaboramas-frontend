import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { initI18n } from "../i18n";
import LanguageToggle from "../components/LanguageToggle";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout() {
  useEffect(() => {
    initI18n();
  }, []);

  return (
    // eslint-disable-next-line react/no-children-prop
    <AuthProvider children={""}>
 <Stack
      screenOptions={{
        headerRight: () => <LanguageToggle />,
      }}
    />    </AuthProvider>
  );
}
