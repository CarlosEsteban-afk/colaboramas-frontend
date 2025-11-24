import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { FontsProvider } from "../src/providers/FontsProvider";
import { AuthProvider } from "../src/providers/AuthProvider";
import { UserProvider } from "../src/providers/UserProvider";
import { initI18n } from "../i18n";

import { ContactsProvider } from "../src/providers/ContactsProvider";

export default function RootLayout() {
  useEffect(() => {
    initI18n();
  }, []);

  return (
    <FontsProvider>
      <UserProvider>
        <AuthProvider>
          <ContactsProvider>
            <Slot />
          </ContactsProvider>
        </AuthProvider>
      </UserProvider>
    </FontsProvider>
  );
}
