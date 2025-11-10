import { UserCardDTO } from "../models/userCard.dto";

const toArray = (value: string | string[]): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

export const userAdapter = {
  fromCardDto(dto: UserCardDTO): UserCardDTO {
    return {
      id: dto.id,
      username: dto.username,
      historialEducativo: toArray(dto.historialEducativo),
      actividadesPersonales: toArray(dto.actividadesPersonales),
      proyectosRecientes: toArray(dto.proyectosRecientes),
    };
  },
};
