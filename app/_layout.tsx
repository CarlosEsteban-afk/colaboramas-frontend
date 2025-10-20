import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../providers/AuthProvider";
import { UserProvider } from "../providers/UserProvider";
export default function RootLayout() {
  return (
    <AuthProvider>
      <UserProvider>
        <Stack />
      </UserProvider>
    </AuthProvider>
  );
}
