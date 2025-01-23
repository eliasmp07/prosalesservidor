import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import storage = require('../utils/cloud_storage.js');
import { hash } from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findUserBySucursalId(sucursalId: number) {
    const users = await this.usersRepository.find({
        where: {
            sucursales: {
                id: sucursalId
            }
        },
        relations: [
            'sucursales',
            'roles',
            'customers',
            'customers.interactions',
            'customers.purchases',
            'customers.reminders',
            'customers.projects'
        ] // Especifica todas las relaciones requeridas
    });
   return {users: users};
}

async findAllUsers(){
  const users = await this.usersRepository.find({
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

  return {
    users : users
  }
}

async getUserById(id: number){
  const user = await this.usersRepository.findOne(
    { 
      where: {
        id: id
      },
      relations: [
        'sucursales',
        'roles',
        'customers',
        'customers.interactions',
        'customers.purchases',
        'customers.reminders',
        'customers.projects'
    ],

    }
  );
  return user
}


  async findAll() {
    const users = await this.usersRepository.find();

    const data = users.map((user) => ({
      lastname: user.lastname,
      name: user.name,
      phone: user.phone,
      image: user.image,
    }));

    return {
      users: data,
    };
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
