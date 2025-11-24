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

    if (user.roles?.includes("ACADEMICO")) {
      router.replace("/academico");
      return;
    }

    if (user.roles?.includes("COMUNICADOR")) {
      router.replace("/comunicador");
      return;
    }

    router.replace("/auth/login");
  }, [user, isAuthenticated]);

  return null; 
}
