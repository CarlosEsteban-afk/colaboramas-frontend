import { User } from "../models/user.interface";
export const isProfileComplete = (user: User) => {
  const requiredFields: (keyof User)[] = [
    "ciudad",
    "pais",
    "motivaciones",
    "historialEducativo",
    "actividadesPersonales",
    "proyectosRecientes",
    "profesion",
    "camposInvestigacion",
    "lineasInteres",
    "imageUrl",
  ];

  for (const field of requiredFields) {
    const value = user[field];
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return false; 
    }
  }

  return true; 
};
