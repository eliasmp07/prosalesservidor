import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Rol) private rolesRepository: Repository<Rol>) {}

    create(rol: CreateRolDto) {
        const newRol = this.rolesRepository.create(rol);
        return this.rolesRepository.save(newRol);
    }
    
    async getAllRoles() {
        const rolesFound = await this.rolesRepository.find()
        return {
            roles: rolesFound
        };
    }

    async getRolesExecutive(){
        const rolesFound = await this.rolesRepository.find({
            where : {
                id: "1"
            }
        })
        return {
            roles: rolesFound
        }
    }

}
