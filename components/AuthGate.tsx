import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "../hooks/useAuth";
export function AuthGate() {
  const { user } = useAuth();

  if (user) {
    // Si está logeado, lo mandamos al home o dashboard
    return <Redirect href="/(tabs)/home" />;
  } else {
    // Si no está logeado, lo mandamos al login
    return <Redirect href="/auth/login" />;
  }
}
