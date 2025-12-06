import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../../src/hooks/useUser";
import { useAuth } from "../../src/hooks/useAuth";

export default function RoleRouter() {
  const router = useRouter();
  const { user } = useUser();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/auth/login");
      return;
    }

    if (!user) {
      console.log("[RoleRouter] Waiting for user data...");
      return;
    }

    console.log("[RoleRouter] User loaded:", user);
    console.log("[RoleRouter] Raw roles:", user.roles);

    const normalizeRole = (r: any) => {
      if (r === null || r === undefined) return "";
      if (typeof r === "string") return r.toUpperCase();
      if (typeof r === "number") return String(r).toUpperCase();
      if (typeof r === "object") {
        const keys = ["name", "nombre", "role", "rol", "code", "type", "label", "value"];
        for (const k of keys) {
          if (k in r && r[k]) return String((r as any)[k]).toUpperCase();
        }
        // Some objects serialize to something useful:
        if ((r as any).toString && typeof (r as any).toString === "function") {
          const s = (r as any).toString();
          if (s && s !== "[object Object]") return s.toUpperCase();
        }
        // Last resort: stringify
        try {
          return JSON.stringify(r).toUpperCase();
        } catch {
          return String(r).toUpperCase();
        }
      }
      return String(r).toUpperCase();
    };

    const rolesArr: string[] = Array.isArray(user.roles)
      ? user.roles.map(normalizeRole)
      : [normalizeRole(user.roles)];

    console.log("[RoleRouter] Roles detected:", rolesArr);

    if (rolesArr.some((r) => r.includes("ADMIN"))) {
      console.log("[RoleRouter] Redirecting to /admin");
      router.replace("/admin");
      return;
    }

    if (rolesArr.some((r) => r.includes("ACADEMICO"))) {
      console.log("[RoleRouter] Redirecting to /academico");
      router.replace("/academico");
      return;
    }

    if (rolesArr.some((r) => r.includes("COMUNICADOR"))) {
      console.log("[RoleRouter] Redirecting to /comunicador");
      router.replace("/comunicador");
      return;
    }

    console.log("[RoleRouter] No valid role found, redirecting to login");
    router.replace("/auth/login");
  }, [user, isAuthenticated, loading]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F6F6F6" }}>
      <ActivityIndicator size="large" color="#6B31E8" />
    </View>
  );
}
