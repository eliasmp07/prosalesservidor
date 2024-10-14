export class CreateUserDto {
    name: string;
    lastname: string;
    email: string;
    isAdmin?: boolean; 
    phone: string;
    password: string;
    image?: string;
}