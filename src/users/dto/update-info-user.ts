import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
export class UpdateInfoUserDto {
    id: number;
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  puesto: string;

  @IsOptional()
  sucusalIds: string[]; // Puede ser opcional, no es necesario actualizar todas las sucursales

  @IsOptional()
  rolesIds: string[]; // Puede ser opcional, no es necesario actualizar todos los roles

  image: string; // Si se proporciona una nueva imagen
  password: string; // La contraseña es opcional para la actualización
}
