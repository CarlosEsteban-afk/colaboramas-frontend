import { useSegments } from "expo-router";
import { useUser } from "../../src/hooks/useUser";

export function useBottomBarItems() {
  const { user } = useUser();
  const segments = useSegments();
  const currentRoute = segments.join("/");

  const allowedRoles = ["ACADEMICO", "COMUNICADOR"];

  const normalizeRole = (r: any): string => {
    if (r === null || r === undefined) return "";
    if (typeof r === "string") return r.toUpperCase();
    if (typeof r === "number") return String(r).toUpperCase();
    if (typeof r === "object") {
      // Keys to try (including uppercase keys like ROLENAME)
      const keys = ["ROLENAME", "ROLENAME", "name", "nombre", "role", "rol", "code", "type", "label", "value"];
      for (const k of keys) {
        if (k in r && (r as any)[k]) return String((r as any)[k]).toUpperCase();
      }
      try {
        const s = (r as any).toString?.();
        if (typeof s === "string" && s && s !== "[object Object]") return s.toUpperCase();
      } catch {}
      try {
        return JSON.stringify(r).toUpperCase();
      } catch {
        return String(r).toUpperCase();
      }
    }
    return String(r).toUpperCase();
  };

  const rolesNormalized: string[] = user?.roles
    ? Array.isArray(user.roles)
      ? user.roles.map(normalizeRole)
      : [normalizeRole(user.roles)]
    : [];

  // Use substring matching so JSON stringified roles are detected
  const hasAccess = rolesNormalized.some((r) =>
    allowedRoles.some((ar) => r.includes(ar))
  );

  if (!hasAccess) return { items: [], currentRoute };

  const getHomeRoute = () => {
    if (rolesNormalized.some((r) => r.includes("ACADEMICO"))) return "/academico";
    if (rolesNormalized.some((r) => r.includes("COMUNICADOR"))) return "/comunicador";
    return "/screens";
  };

  const baseItems = [
    { label: "Inicio", icon: "mdi:home-outline", route: getHomeRoute() },
    { label: "Buscar", icon: "feather:search", route: "/screens/search" },
    { label: "Eventos", icon: "mdi:calendar", route: "/academico/events", roles: ["ACADEMICO"] },
    { label: "Contactos", icon: "fluent:alert-20-regular", route: "/screens/contacts" },
    { label: "Perfil", icon: "mdi:account-circle-outline", route: "/screens/profile" },
  ];

  const items = baseItems.filter((item) => {
    if (!item.roles) return true;
    const allowed = item.roles.map((role) => String(role).toUpperCase());
    return rolesNormalized.some((r) => allowed.some((a) => r.includes(a)));
  });

  return { items, currentRoute };
}
