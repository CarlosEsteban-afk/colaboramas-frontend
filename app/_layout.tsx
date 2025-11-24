import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { initI18n } from "../i18n";
import { AuthProvider } from "../src/providers/AuthProvider";
import { UserProvider } from "../src/providers/UserProvider";
import { ContactsProvider } from "../src/providers/ContactsProvider";
import { FontsProvider } from "../src/providers/FontsProvider";

export default function RootLayout() {

  useEffect(() => {
    initI18n();
  }, []);

  return (
    <FontsProvider>
      <UserProvider>
        <AuthProvider>
          <ContactsProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </ContactsProvider>
        </AuthProvider>
      </UserProvider>
    </FontsProvider>
  );
}
