import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}
    @Post()
    create(@Body() rol: CreateRolDto) {
        return this.rolesService.create(rol);
    }

    @Get('getAllRoles')
    getAllRoles(){
        return this.rolesService.getAllRoles()
    }

}
