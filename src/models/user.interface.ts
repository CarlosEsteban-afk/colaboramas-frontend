interface User {
  id?: number;
  username: string;
  email: string;
  roles?: string[];
  imageUrl?: string;
  ciudad?: string;
  pais?: string;
  motivaciones?: string[] | string;
  historialEducativo?: string[];
  actividadesPersonales?: string[];
  proyectosRecientes?: string[];



}
export { User };
