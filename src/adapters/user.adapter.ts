import { UserCardDTO } from "../models/userCard.dto";

const toArray = (value: string | string[]): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

export const userAdapter = {
  fromCardDto(dto: UserCardDTO): UserCardDTO {
    return {
      id: dto.id,
      nombre: dto.nombre,
      imageUrl: dto.imageUrl,
      pais: dto.pais,
      ciudad: dto.ciudad,
      profesion: dto.profesion,
      camposInvestigacion: toArray(dto.camposInvestigacion),
      lineasInteres: toArray(dto.lineasInteres),
    };
  },
};



