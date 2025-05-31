import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './strategies/jwt.strategy';
import { MailService } from './service/MailService';
import { RolesService } from 'src/roles/roles.service';
import { Rol } from 'src/roles/rol.entity';
import { SucursalesService } from 'src/sucursales/sucursales.service';
import { Sucursales } from 'src/sucursales/entities/sucursale.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure that this is correctly configured
    TypeOrmModule.forFeature([User, Rol, Sucursales]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SucursalesService, AuthService, AccessTokenStrategy, RefreshTokenStrategy, MailService, RolesService],
  controllers: [AuthController],
})
export class AuthModule {}
