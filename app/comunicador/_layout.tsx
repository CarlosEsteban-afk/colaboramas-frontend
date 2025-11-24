import React from "react";
import { Stack } from "expo-router";

export default function ComunicadorLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
    </Stack>
  );
}
