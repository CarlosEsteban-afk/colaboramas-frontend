import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../../src/hooks/useUser";
import { useAuth } from "../../src/hooks/useAuth";

export default function RoleRouter() {
  const router = useRouter();
  const { user } = useUser();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    console.log("[RoleRouter] Render:", { loading, isAuthenticated, user });

    if (loading) return;

    if (!isAuthenticated) {
      console.log("[RoleRouter] Not authenticated → redirect to login");
      router.replace("/auth/login");
      return;
    }

    if (!user) {
      console.log("[RoleRouter] User not loaded yet...");
      return;
    }

    console.log("[RoleRouter] User loaded:", user);
    console.log("[RoleRouter] Raw roles:", user.roles);

    const normalizeRole = (r: any): string => {
      if (!r) return "";
      if (typeof r === "string") return r.toUpperCase();

      if (typeof r === "object") {
        const keys = ["name", "nombre", "role", "rol", "code", "type", "label", "value"];
        for (const k of keys) {
          if (r[k]) return String(r[k]).toUpperCase();
        }
        return JSON.stringify(r).toUpperCase();
      }

      return String(r).toUpperCase();
    };

    const rolesArr: string[] = Array.isArray(user.roles)
      ? user.roles.map(normalizeRole)
      : [normalizeRole(user.roles)];

    console.log("[RoleRouter] Roles detected:", rolesArr);

    if (rolesArr.some((r) => r.includes("ADMIN"))) {
      console.log("[RoleRouter] Redirecting → /admin");
      router.replace("/admin");
      return;
    }

    if (rolesArr.some((r) => r.includes("ACADEMICO"))) {
      console.log("[RoleRouter] Redirecting → /academico");
      router.replace("/academico");
      return;
    }

    if (rolesArr.some((r) => r.includes("COMUNICADOR"))) {
      console.log("[RoleRouter] Redirecting → /comunicador");
      router.replace("/comunicador");
      return;
    }

    console.log("[RoleRouter] No valid role found → redirect to login");
    router.replace("/auth/login");
  }, [user, isAuthenticated, loading]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F6F6F6" }}>
      <ActivityIndicator size="large" color="#6B31E8" />
    </View>
  );
}
