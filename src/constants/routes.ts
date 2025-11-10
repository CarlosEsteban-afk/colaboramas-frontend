
export const ROUTES = {
  HOME: "/(tabs)/home",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  PROFILE: (id?: string) => id ? `/user/${id}` : "/user/[id]",
  SETTINGS: "/settings",
  USER_CARD: "/users/card",
  CREATE_TOUR: "/guide/create-tour",
} as const;
