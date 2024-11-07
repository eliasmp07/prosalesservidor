import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { resetPasswordDto } from './dto/reset-password.dto';
import { MailService } from './service/MailService';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private mailService: MailService){}

    @Post('register')
    register(@Body() user: RegisterUserDto){
        return this.authService.register(user)
    }

    @Post('login')
    login(@Body() user: LoginAuthDto){
        return this.authService.login(user)
    }

    @Post('resetPassword')
    async resetPassword(@Body() resetPassword: resetPasswordDto){
        await this.mailService.sendPasswordResetEmail(resetPassword.email, resetPassword.email)
    }
}
