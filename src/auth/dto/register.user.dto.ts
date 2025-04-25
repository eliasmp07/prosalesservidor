import { IsEmail, isNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDto {

    name: string;

    lastname: string;

    email: string;

    sucusalIds: string[];

    puesto: string;


    phone: string;

    image: string;

    password: string;

    rolesIds: string[];

    notificationToken?: string;

    refreshToken: string;
}