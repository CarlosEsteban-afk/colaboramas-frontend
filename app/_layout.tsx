import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout() {
  return (
    // eslint-disable-next-line react/no-children-prop
    <AuthProvider children={""}>
      <Stack />
    </AuthProvider>
  );
}
