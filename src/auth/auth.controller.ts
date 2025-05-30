import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { resetPasswordDto } from './dto/reset-password.dto';
import { MailService } from './service/MailService';
import { alertReminderDto } from './dto/alert_reminder.dto';
import { Request } from 'express';
import { RefreshTokenGuard } from './guards/refresh_token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  @Post('register')
  register(@Body() user: RegisterUserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  login(@Body() user: LoginAuthDto) {
    return this.authService.login(user);
  }

  @Post('newLogin')
  newLogin(@Body() user: LoginAuthDto) {
    return this.authService.newLogin(user);
  }

  @Post('resetPassword')
  async resetPassword(@Body() resetPassword: resetPasswordDto) {
    await this.mailService.sendPasswordResetEmail(
      resetPassword.email,
      resetPassword.email,
    );
  }

  @Post('alert')
  async alertMessage(@Body() alertReminderDto: alertReminderDto) {
    await this.mailService.sendAlertEmail(alertReminderDto);
  }

  @Post('refreshToken')
  refreshTokenWithBody(@Body() body: { userId: string; refreshToken: string }) {
    const { userId, refreshToken } = body;
    console.log('Entre')
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
