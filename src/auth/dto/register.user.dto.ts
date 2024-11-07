import { IsEmail, isNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDto {

    @IsString()
    name: string;

    @IsString()
    lastname: string;

 
    @IsString()
    @IsEmail()
    email: string;


    @IsString()
    phone: string;

    @IsString()
    @MinLength(6, {message: 'La contraseña tiene que ser minimo de 6 caracteres'})
    password: string;

    rolesIds: string[];

    refreshToken: string;
}