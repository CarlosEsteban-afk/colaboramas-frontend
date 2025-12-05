import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useUser } from "../../src/hooks/useUser";
import { useAuth } from "../../src/hooks/useAuth";

export default function RoleRouter() {
  const router = useRouter();
  const { user } = useUser();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
      return;
    }

    if (!user) return;

    // Normalize roles to strings and uppercase for robust matching
    const rolesArr: string[] = Array.isArray(user.roles) ? user.roles.map((r: any) => String(r).toUpperCase()) : [String(user.roles).toUpperCase()];

    // If user is admin, go to admin dashboard
    if (rolesArr.some((r) => r.includes("ADMIN"))) {
      router.replace("/admin");
      return;
    }

    if (rolesArr.includes("ACADEMICO")) {
      router.replace("/academico");
      return;
    }

    if (rolesArr.includes("COMUNICADOR")) {
      router.replace("/comunicador");
      return;
    }

    router.replace("/auth/login");
  }, [user, isAuthenticated]);

  return null; 
}
