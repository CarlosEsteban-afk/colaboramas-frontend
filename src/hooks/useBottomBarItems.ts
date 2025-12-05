import { useSegments } from "expo-router";
import { useUser } from "../../src/hooks/useUser";

export function useBottomBarItems() {
  const { user } = useUser();
  const segments = useSegments();
  const currentRoute = segments.join("/"); 

  const allowedRoles = ["ACADEMICO", "COMUNICADOR"];
  const hasAccess = user && user.roles?.some(r => allowedRoles.includes(r.toUpperCase()));

  if (!hasAccess) return { items: [], currentRoute };

  const getHomeRoute = () => {
    if (user.roles.some((r) => r.toUpperCase() === "ACADEMICO")) return "/academico";
    if (user.roles.some((r) => r.toUpperCase() === "COMUNICADOR")) return "/comunicador";
    return "/screens";
  };

  const baseItems = [
    { label: "Inicio", icon: "mdi:home-outline", route: getHomeRoute() },
    { label: "Buscar", icon: "feather:search", route: "/screens/search" },
    { label: "Eventos", icon: "mdi:calendar", route: "/academico/events", roles: ["ACADEMICO"] },
    { label: "Contactos", icon: "fluent:alert-20-regular", route: "/screens/contacts" },
    { label: "Perfil", icon: "mdi:account-circle-outline", route: "/screens/profile" },
  ];

  const items = baseItems.filter(item => {
    if (!item.roles) return true;
    return user.roles.some(r =>
      item.roles.map(role => role.toUpperCase()).includes(r.toUpperCase())
    );
  });

  return { items, currentRoute };
}
