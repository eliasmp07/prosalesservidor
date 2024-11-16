import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    // GET -> OBTENER
    // POST -> CREAR
    // PUT ' PATCH -> ACTUALIZAR
    // DELETE ' => BORRAR

    //@UseGuards(JwtAuthGuard)
    @Get("getAllUsers")
    findAll(){
        return this.usersService.findAll();
    }

    @Get("getUserBySucursal/:sucursalId")
    findUserBySucursal(
        @Param('sucursalId', ParseIntPipe) id: number,
    ){
        return this.usersService.findUserBySucursalId(id)
    }

    @Post() // http://localhost/users -> POST 
    create(@Body() user: CreateUserDto) {
        return this.usersService.create(user);
    }

    @Put(':id') // http://192.168.1.15:3000/users/:id -> PUT 
    update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        return this.usersService.update(id, user);
    }

    @Put('updateWithImage/:id')
    updateWithImage(
        @Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto 
    ) { 
        console.log('ID recibido:', id);
        console.log('Datos del usuario recibidos:', user);
        return this.usersService.updateWithImage(id, user)
    }
}
