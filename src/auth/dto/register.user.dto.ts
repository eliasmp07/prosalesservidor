import { IsEmail, isNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDto {

    @IsString()
    name: string;

    @IsString()
    lastname: string;

    @IsString()
    @IsEmail()
    email: string;

    sucusalIds: string[];

    puesto: string;

    @IsString()
    phone: string;

    image: string;

    @IsString()
    @MinLength(6, {message: 'La contraseña tiene que ser minimo de 6 caracteres'})
    password: string;

    rolesIds: string[];

    notificationToken?: string;

    refreshToken: string;
}