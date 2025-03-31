import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
export class UpdateInfoUserDto {
  id: number;

  name: string;

  lastname: string;

  email: string;

  phone: string;

  puesto: string;

  sucusalIds: string[]; // Puede ser opcional, no es necesario actualizar todas las sucursales

  rolesIds: string[]; // Puede ser opcional, no es necesario actualizar todos los roles

  image: string; // Si se proporciona una nueva imagen

  password: string; // La contraseña es opcional para la actualización
}
