import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { initI18n } from "../i18n";
import LanguageToggle from "../components/LanguageToggle";
import { AuthProvider } from "../providers/AuthProvider";
import { UserProvider } from "../providers/UserProvider";
export default function RootLayout() {
  useEffect(() => {
    initI18n();
  }, []);

  return (
    <AuthProvider>
      <UserProvider>
        <Stack />
      </UserProvider>
    </AuthProvider>
  );
}
