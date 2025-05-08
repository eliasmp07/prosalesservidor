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

  @Get('tableDates')
  findAllDatesUsersByMouth(){
    return this.usersService.findAllDatesNowByAllUsers()
  }

  @Get('statusCitas')
async getDates(): Promise<string> {
  const data = await this.usersService.findAllDatesNowByAllUsers();

  const rows = data.map(
    (item) => `<tr><td>${item.clave}</td><td>${item.saleExecutive}</td><td>${item.totalDates}</td></tr>`
  ).join('\n');

  const today = new Date();

  const total = data.reduce((sum, item) => sum + item.totalDates, 0);

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <link rel="icon" href="https://1.bp.blogspot.com/-rK4-Xp5tY_U/X_4ZjWc4cqI/AAAAAAAABbQ/HYMo-KaYvOwAUV0ZD0ORfD6NOrF-KRr0wCLcBGAsYHQ/s1431/Propapel-logo.png" sizes="any">
      <title>Participación en Citas</title>
      <style>
      header {
      background-color: #007BFF;
      color: white;
      padding: 20px;
      text-align: center;
    }
        body {
          font-family: Arial, sans-serif;
          background-color: #f7f9fc;
          padding: 20px;
        }
        h2 {
          background-color: #007BFF;
          color: white;
          padding: 15px;
          text-align: center;
          border-radius: 8px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          background-color: white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
        }
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #0056b3;
          color: white;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        tfoot td {
          font-weight: bold;
          background-color: #e9ecef;
        }
      </style>
    </head>
    <body>
      
     <header>
    <h1>Participación en Citas</h1>
    <p>Clientes nuevos, en crecimiento o recuperados - ${today.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}</p>

  </header>

      <table>
        <thead>
          <tr>
            <th>CLAVE</th>
            <th>VENDEDOR</th>
            <th>ASISTIDAS / MES ACTUAL</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">Total</td>
            <td>${total}</td>
          </tr>
        </tfoot>
      </table>

    </body>
    </html>
  `;
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
