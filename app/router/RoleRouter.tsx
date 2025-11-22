import { Redirect } from "expo-router";
import { useUser } from "../../src/hooks/useUser";
import { useAuth } from "../../src/hooks/useAuth";
import React from "react";

export default function RoleRouter() {
  const { user } = useUser();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Redirect href="/auth/login" />;

  if (!user) return null; 

  if (user.roles?.includes("ACADEMICO")) {
    return <Redirect href="/academico/screens"/>;
  }

  if (user.roles?.includes("COMUNICADOR")) {
    return <Redirect href="/comunicador/screens"/>;
  }

  return <Redirect href="/auth/login" />;
}
