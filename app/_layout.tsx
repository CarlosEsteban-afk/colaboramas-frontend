import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { initI18n } from "../i18n";

export default function RootLayout() {
  useEffect(() => {
    initI18n();
  }, []);

  return <Stack />;
}
