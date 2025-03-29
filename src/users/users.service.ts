import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import storage = require('../utils/cloud_storage.js');
import { Not, Like } from "typeorm";
import { hash } from 'bcrypt';
import { Sucursales } from 'src/sucursales/entities/sucursale.entity';
import { UpdateInfoUserDto } from './dto/update-info-user';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

async findUserBySucursalId(sucursalId: number) { 
    const users = await this.usersRepository.find({
        where: {
            sucursales: { id: sucursalId },
            email: Like('%@propapel.com.mx') // Filtrar solo correos que terminen en @propapel.com.mx
        },
        relations: [
            'sucursales',
            'roles',
            'customers',
            'customers.interactions',
            'customers.purchases',
            'customers.reminders',
            'customers.projects'
        ]
    });
    return { users };
}

async findAllUsers(){
  const users = await this.usersRepository.find({
    where: {
      email: Like('%@propapel.com.mx') // Filtrar solo correos válidos
    },
    relations: [
      'sucursales',
      'roles',
      'customers',
      'customers.interactions',
      'customers.purchases',
      'customers.reminders',
      'customers.projects'
    ]
  });

  return { users };
}

async getUserById(id: number){
  const user = await this.usersRepository.findOne({ 
      where: {
        id: id,
        email: Like('%@propapel.com.mx') // Filtrar solo correos válidos
      },
      relations: [
        'sucursales',
        'roles',
        'customers',
        'customers.interactions',
        'customers.purchases',
        'customers.reminders',
        'customers.projects'
      ]
  });
  return user;
}

async getAllUserBySucursales(){
  const users = await this.usersRepository.find({
    where: {
      email: Like('%@propapel.com.mx') // Filtrar solo correos válidos
    },
    relations: [
      'sucursales',
      'roles',
      'customers',
      'customers.interactions',
      'customers.purchases',
      'customers.reminders',
      'customers.projects'
    ]
  });
}

async findUserBySucursale() {
    const usersFound = await this.usersRepository.find({
        where: {
            email: Like('%@propapel.com.mx') // Filtrar solo correos válidos
        },
        relations: [ 
          'sucursales',
          'roles',
          'customers',
          'customers.interactions',
          'customers.purchases',
          'customers.reminders',
          'customers.projects'
        ]
    });

    const merida = "Propapel Merida";
    const mty = "Propapel Monterrey";
    const mexico = "Propapel Mexico";

    // Filtrar los usuarios por sucursal
    const usersBySucursal = {
        merida: usersFound.filter(user => user.sucursales.some(sucursal => sucursal.nombre === merida)),
        monterrey: usersFound.filter(user => user.sucursales.some(sucursal => sucursal.nombre === mty)),
        mexico: usersFound.filter(user => user.sucursales.some(sucursal => sucursal.nombre === mexico)),
    };

    return usersBySucursal;
}

async findAll() {
    const users = await this.usersRepository.find({
        where: {
            email: Like('%@propapel.com.mx') // Filtrar solo correos válidos
        }
    });

    const data = users.map((user) => ({
      lastname: user.lastname,
      name: user.name,
      phone: user.phone,
      image: user.image,
    }));

    return { users: data };
}

  async update(id: number, user: UpdateUserDto) {
    console.log('ID recibido:', id);
    console.log('Datos del usuario recibidos:', user);
    const userFound = await this.usersRepository.findOneBy({ id: id });
    if (!userFound) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    const updatedUser = Object.assign(userFound, user);
    return this.usersRepository.save(updatedUser);
  }

  async updateInfoUser(updateUserInfo: UpdateInfoUserDto){
    const user = await this.usersRepository.findOneBy({ id: updateUserInfo.id });
    if (!user) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }
    
  const hashedPassword = await hash(updateUserInfo.password, Number(process.env.HAST_SALT));
  const isDifferencePassword = await hash(updateUserInfo.password, updateUserInfo.password);

    if (isDifferencePassword) {
      
    }
  }

  async deleteUser(userId: number){
    const userFound = await this.usersRepository.findOneBy({ id: userId });
    if (!userFound) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }
    userFound.isDelete = true
    await this.usersRepository.save(userFound);
  
    return { message: 'Usuario elimininado' };}

    
  async activeUser(userId: number){
    const userFound = await this.usersRepository.findOneBy({ id: userId });
    if (!userFound) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }
    userFound.isDelete = false
    await this.usersRepository.save(userFound);
  
    return { message: 'Usuario elimininado' };}


async updatePassword(userId: number, newPassword: string): Promise<{ message: string }> {
  // 1. Buscar al usuario por su ID
  const user = await this.usersRepository.findOneBy({ id: userId });
  if (!user) {
    throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
  }

  // 2. Hashear la nueva contraseña
  const hashedPassword = await hash(newPassword, Number(process.env.HAST_SALT));

  // 3. Actualizar la contraseña
  user.password = hashedPassword;

  // 4. Guardar el usuario con la nueva contraseña
  await this.usersRepository.save(user);

  // 5. Retornar un mensaje de confirmación
  return { message: 'Contraseña actualizada correctamente' };}



  async updateWithImage(id: number, user: UpdateUserDto) {
    const userFound = await this.usersRepository.findOneBy({ id: id });

    if (!userFound) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    // Solo intentamos procesar la imagen si está presente
    if (user.image != '') {
      const buffer = Buffer.from(user.image, 'base64'); // Asegúrate de que image sea una cadena Base64 válida
      const pathImage = `profilePhoto_${Date.now()}`;
      const imageUrl = await storage(buffer, pathImage);

      if (imageUrl) {
        user.image = imageUrl; // Actualiza la URL de la imagen en el objeto user
      }
    }
    const updatedUser = Object.assign(userFound, user);
    console.log('User before saving:', updatedUser);

    await this.usersRepository.save(updatedUser);

    console.log('User saved successfully');

    const newUser = await this.usersRepository.findOneBy({ id });

    const data = {
      lastname: newUser.lastname,
      name: newUser.name,
      phone: newUser.phone,
      image: user.image,
    };
    console.log()
    return data;
  }
}
