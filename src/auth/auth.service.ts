import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register.user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { MailService } from './service/MailService';
import { resetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService,
    private configService: ConfigService
    ){}

    async register(user: RegisterUserDto) {
        const emailExist = await this.usersRepository.findOneBy({ email: user.email });
        const isPhoneExiste = await this.usersRepository.findOneBy({ phone: user.phone });
    
        if (emailExist) {
            throw new HttpException('El email ya está registrado', HttpStatus.CONFLICT);
        }
    
        if (isPhoneExiste) {
          throw new HttpException('Ya hay un usuario con ese número de teléfono', HttpStatus.CONFLICT); 
        }
    
        // Crear el nuevo usuario
        const newUser = this.usersRepository.create({
            ...user,
            refreshToken: '' // O null, si has cambiado la columna a permitir NULL
        });
    
    await this.usersRepository.save(newUser); 

    // Generar tokens
    const tokens = await this.getTokens(newUser.id.toString(), newUser.name); 
    await this.updateRefreshToken(newUser.id.toString(), tokens.refreshToken); // Esto actualizará el refreshToken en la base de datos
    
    return tokens;
    }
    

    async login(loginRequest: LoginAuthDto){
        const {email, password} = loginRequest
        const userFound = await this.usersRepository.findOneBy({email: email});

        if(!userFound){
          throw new HttpException('El email no existe', HttpStatus.NOT_FOUND);
        }
        
        const isPasswordValid = await compare(password, userFound.password);

        if(!isPasswordValid){
          throw new  HttpException('La contraseña es incorrecta', HttpStatus.FORBIDDEN);
        }

        const payload = {id: userFound.id, name: userFound.name};
        const token = this.jwtService.sign(payload)
      
        const tokens = await this.getTokens(payload.id.toString(), payload.name);
        await this.updateRefreshToken(userFound.id.toString(), tokens.refreshToken);

        const accessTokenExpirationTimestamp = Math.floor(Date.now() / 1000) + 3600;
        const data = {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          accessTokenExpirationTimestamp: accessTokenExpirationTimestamp,
          userId: payload.id,
          lastname: userFound.lastname,
          name: userFound.name,
          isAdmin: userFound.isAdmin,
          email: userFound.email,
          image: userFound.image
      }
        return data;
        
    }


    async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.usersRepository.findOneBy({id: Number(userId)});
        if (!user || !user.refreshToken)
           return new  HttpException('Acceso denegado', HttpStatus.FORBIDDEN);
        const refreshTokenMatches = await argon2.verify(
          user.refreshToken,
          refreshToken,
        );
        if (!refreshTokenMatches)  return new  HttpException('Acceso denegado', HttpStatus.FORBIDDEN);
        const tokens = await this.getTokens(user.id.toString(), user.name);
        await this.updateRefreshToken(user.id.toString() , tokens.refreshToken);
        return tokens;
      }
    
      async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersRepository.update(userId, {
          refreshToken: hashedRefreshToken,
        });
      }

      hashData(data: string) {
        return argon2.hash(data);
      }
    
      async getTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(
            {
              sub: userId,
              username,
            },
            {
              secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
              expiresIn: '15m',
            },
          ),
          this.jwtService.signAsync(
            {
              sub: userId,
              username,
            },
            {
              secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
              expiresIn: '7d',
            },
          ),
        ]);
    
        return {
          accessToken,
          refreshToken,
        };
      }
}

