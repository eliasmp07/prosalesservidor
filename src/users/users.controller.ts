import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateInfoUserDto } from './dto/update-info-user';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET -> OBTENER
  // POST -> CREAR
  // PUT ' PATCH -> ACTUALIZAR
  // DELETE ' => BORRAR

  //@UseGuards(JwtAuthGuard)

  //NEW VERSION GET INFO

  @Get('findAllUserByBranch/:sucursalId')
  findAllUserBySucursal(@Param('sucursalId', ParseIntPipe) id: number) {
    return this.usersService.findAllUserByBranch(id)
  }

  @Put('updateInfo')
  updateInfoUser( @Body() UpdateInfoUserDto: UpdateInfoUserDto){
    return this.usersService.updateInfoUser(UpdateInfoUserDto)
  }

  @Get('findByAllUsers')
  findByAllUsers(){
    return this.usersService.findBYAllUsers();
  }

  @Get('findByUserAllUsersBranches')
  findByAllUsersByBranch() {
    return this.usersService.findByAllUsersByBranches();
  }

  @Get('getAllUsers')
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get('getUserAllSucursales')
  findUserByAllSucursales() {
    return this.usersService.findUserBySucursale();
  }

  @Get('getUserBySucursal/:sucursalId')
  findUserBySucursal(@Param('sucursalId', ParseIntPipe) id: number) {
    return this.usersService.findAllUserBySucursale(id)
  }

  @Get('getUserById/:Id')
  getUserById(@Param('Id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Post() // http://localhost/users -> POST
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Put(':id') // http://192.168.1.15:3000/users/:id -> PUT
  update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return this.usersService.update(id, user);
  }

  @Patch(':id/password')
  async updatePassword(
    @Param('id') id: number,
    @Body('password') newPassword: string,
  ) {
    return this.usersService.updatePassword(id, newPassword);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    console.log('ID recibido:', id);
    return this.usersService.deleteUser(id);
  }

  @Put('active/:id')
  activeUser(@Param('id', ParseIntPipe) id: number) {
    console.log('ID recibido:', id);
    return this.usersService.activeUser(id);
  }

  @Put('updateWithImage/:id')
  updateWithImage(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    console.log('ID recibido:', id);
    console.log('Datos del usuario recibidos:', user);
    return this.usersService.updateWithImage(id, user);
  }
}
