import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { compare } from 'bcrypt';
import storage = require('../utils/cloud_storage.js');
import { Not, Like } from 'typeorm';
import { hash } from 'bcrypt';
import { Sucursales } from 'src/sucursales/entities/sucursale.entity';
import { UpdateInfoUserDto } from './dto/update-info-user';
import { Rol } from 'src/roles/rol.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Rol) private rolesRepository: Repository<Rol>,
    @InjectRepository(Sucursales)
    private sucusalesRepository: Repository<Sucursales>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findAllUserBySucursale(sucursalId: number) {
    const users = await this.usersRepository.find({
      where: [
        {
          sucursales: { id: sucursalId },
          roles: { id: Like('1') },
          email: Like('%@propapel.com.mx'),
        },
        {
          sucursales: { id: sucursalId },
          roles: { id: Like('1') },
          email: Like('%@optivosa.com'),
        },
      ],
      relations: [
        'sucursales',
        'roles',
        'customers',
        'customers.interactions',
        'customers.purchases',
        'customers.reminders',
        'customers.projects',
      ],
    });

    return { users };
  }

  async findAllUsers() {
    const users = await this.usersRepository.find({
      where: [
        { email: Like('%@optivosa.com') },
        { email: Like('%@propapel.com.mx') },
      ],
      relations: [
        'sucursales',
        'roles',
        'customers',
        'customers.interactions',
        'customers.purchases',
        'customers.reminders',
        'customers.projects',
      ],
    });

    return { users };
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: [
        { id: id, email: Like('%@propapel.com.mx') },
        { id: id, email: Like('%@optivosa.com') },
      ],
      relations: [
        'sucursales',
        'roles',
        'customers',
        'customers.interactions',
        'customers.purchases',
        'customers.reminders',
        'customers.projects',
      ],
    });
    return user;
  }

  async getAllUserBySucursales() {
    const users = await this.usersRepository.find({
      where: [
        { email: Like('%@propapel.com.mx') },
        { email: Like('%@optivosa.com') },
      ],
      relations: [
        'sucursales',
        'roles',
        'customers',
        'customers.interactions',
        'customers.purchases',
        'customers.reminders',
        'customers.projects',
      ],
    });
    return users;
  }

  async findUserBySucursale() {
    const usersFound = await this.usersRepository.find({
      where: [
        { email: Like('%@propapel.com.mx') },
        { email: Like('%@optivosa.com') },
      ],
      relations: [
        'sucursales',
        'roles',
        'customers',
        'customers.interactions',
        'customers.purchases',
        'customers.reminders',
        'customers.projects',
      ],
    });

    const merida = 'Propapel Merida';
    const mty = 'Propapel Monterrey';
    const mexico = 'Propapel Mexico';

    const usersBySucursal = {
      merida: usersFound.filter((user) =>
        user.sucursales.some((sucursal) => sucursal.nombre === merida),
      ),
      monterrey: usersFound.filter((user) =>
        user.sucursales.some((sucursal) => sucursal.nombre === mty),
      ),
      mexico: usersFound.filter((user) =>
        user.sucursales.some((sucursal) => sucursal.nombre === mexico),
      ),
    };

    return usersBySucursal;
  }

  async findAll() {
    const users = await this.usersRepository.find({
      where: [
        { email: Like('%@propapel.com.mx') },
        { email: Like('%@optivosa.com') },
      ],
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

  async updateInfoUser(updateUserInfo: UpdateInfoUserDto) {
    console.log(updateUserInfo);

    // 2️⃣ Actualiza los datos del usuario
    const existingUser = await this.usersRepository.findOne({
      where: { id: updateUserInfo.id },
    });

    if (!existingUser) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    if (updateUserInfo.password.length > 0) {
      // 2. Hashear la nueva contraseña
      const hashedPassword = await hash(
        updateUserInfo.password,
        Number(process.env.HAST_SALT),
      );

      // 3. Actualizar la contraseña
      existingUser.password = hashedPassword;
    }

    // Actualiza los valores del usuario
    existingUser.name = updateUserInfo.name || existingUser.name;
    existingUser.lastname = updateUserInfo.lastname || existingUser.lastname;
    existingUser.email = updateUserInfo.email || existingUser.email;
    existingUser.phone = updateUserInfo.phone || existingUser.phone;
    existingUser.puesto = updateUserInfo.puesto || existingUser.puesto;

    // 3️⃣ Actualiza las sucursales del usuario
    let sucursalIds =
      updateUserInfo.sucusalIds && updateUserInfo.sucusalIds.length > 0
        ? updateUserInfo.sucusalIds
        : ['Propapel Merida'];

    const sucursales = await this.sucusalesRepository.find({
      where: { id: In(sucursalIds) },
    });

    existingUser.sucursales = sucursales; // Asigna las sucursales al usuario

    // 4️⃣ Actualiza los roles del usuario
    let rolesIds =
      updateUserInfo.rolesIds && updateUserInfo.rolesIds.length > 0
        ? updateUserInfo.rolesIds
        : ['Ejecutivo de ventas'];

    const roles = await this.rolesRepository.find({
      where: { id: In(rolesIds) },
    });

    existingUser.roles = roles; // Asigna los roles al usuario

    // 5️⃣ Si se proporciona una nueva imagen, la guarda
    if (updateUserInfo.image != existingUser.image) {
      const buffer = Buffer.from(updateUserInfo.image, 'base64');
      const pathImage = `profilePhoto_${Date.now()}`;
      const imageUrl = await storage(buffer, pathImage);

      if (imageUrl) {
        existingUser.image = imageUrl; // Actualiza la URL de la imagen
      }
    }

    // 6️⃣ Guarda el usuario actualizado en la base de datos
    const updatedUser = await this.usersRepository.save(existingUser);
  }

  async deleteUser(userId: number) {
    const userFound = await this.usersRepository.findOneBy({ id: userId });
    if (!userFound) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }
    userFound.isDelete = true;
    await this.usersRepository.save(userFound);

    return { message: 'Usuario elimininado' };
  }

  async activeUser(userId: number) {
    const userFound = await this.usersRepository.findOneBy({ id: userId });
    if (!userFound) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }
    userFound.isDelete = false;
    await this.usersRepository.save(userFound);

    return { message: 'Usuario elimininado' };
  }

  async updatePassword(
    userId: number,
    newPassword: string,
  ): Promise<{ message: string }> {
    // 1. Buscar al usuario por su ID
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    // 2. Hashear la nueva contraseña
    const hashedPassword = await hash(
      newPassword,
      Number(process.env.HAST_SALT),
    );

    // 3. Actualizar la contraseña
    user.password = hashedPassword;

    // 4. Guardar el usuario con la nueva contraseña
    await this.usersRepository.save(user);

    // 5. Retornar un mensaje de confirmación
    return { message: 'Contraseña actualizada correctamente' };
  }

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
    console.log();
    return data;
  }

  // NEW VERSION GET INFO

  async findBYAllUsers() {
    const users = await this.usersRepository.find({
      where: [
        { email: Like('%@optivosa.com') },
        { email: Like('%@propapel.com.mx') },
      ],
      relations: [
        'sucursales',
        'roles',
        'customers',
        'customers.notes',
        'customers.interactions',
        'customers.purchases',
        'customers.reminders',
        'customers.projects',
      ],
    });

    return { users };
  }

  /**
   *
   * @returns
   */
  async findByAllUsersByBranches() {
    const usersFound = await this.usersRepository.find({
      where: [
        { email: Like('%@propapel.com.mx') },
        { email: Like('%@optivosa.com') },
      ],
      relations: [
        'sucursales',
        'roles',
        'customers',
        'customers.notes',
        'customers.interactions',
        'customers.purchases',
        'customers.reminders',
        'customers.projects',
      ],
    });

    const merida = 'Propapel Merida';
    const mty = 'Propapel Monterrey';
    const mexico = 'Propapel Mexico';

    const usersBySucursal = {
      merida: usersFound.filter((user) =>
        user.sucursales.some((sucursal) => sucursal.nombre === merida),
      ),
      monterrey: usersFound.filter((user) =>
        user.sucursales.some((sucursal) => sucursal.nombre === mty),
      ),
      mexico: usersFound.filter((user) =>
        user.sucursales.some((sucursal) => sucursal.nombre === mexico),
      ),
    };

    return usersBySucursal;
  }

  /**
   *
   */
  async findAllUserByBranch(sucursalId: number) {
    const users = await this.usersRepository.find({
      where: [
        {
          sucursales: { id: sucursalId },
          roles: { id: Like('1') },
          email: Like('%@propapel.com.mx'),
        },
        {
          sucursales: { id: sucursalId },
          roles: { id: Like('1') },
          email: Like('%@optivosa.com'),
        },
      ],
      relations: [
        'sucursales',
        'roles',
        'customers',
        'customers.notes',
        'customers.interactions',
        'customers.purchases',
        'customers.reminders',
        'customers.projects',
      ],
    });

    return { users };
  }

  async findAllDatesNowByAllUsers(): Promise<InfoTableDatesDto[]> {
    /*
     const timestamp: number = Number(reminder.reminder_date);
      const dateUTC = new Date(timestamp).toISOString();
      const reminderDate = new Date(dateUTC);
      const today = new Date();
    */
    const today = new Date();

    const users = await this.usersRepository.find({
      where: [
        { email: Like('%@optivosa.com') },
        { email: Like('%@propapel.com.mx') },
      ],
      relations: ['sucursales', 'customers', 'customers.reminders',],
    });

    const results: InfoTableDatesDto[] = [];

    for (const user of users) {
      const saleExecutive = `${user.name} ${user.lastname}`;
      const clave = this.detectWalletByUser(user.id) || 'Sin clave';
      let totalDates = 0;

      for (const customer of user.customers || []) {
        for (const reminder of customer.reminders || []) {
          const timestamp: number = Number(reminder.reminder_date);
          const dateUTC = new Date(timestamp).toISOString();
          const reminderDate = new Date(dateUTC);

            if (
              reminder.is_completed && reminderDate.getUTCFullYear() === today.getUTCFullYear() &&
              reminderDate.getUTCMonth() === today.getUTCMonth() &&
              this.isAppointmentTypeValid(reminder.typeAppointment)
            ) {
              totalDates++;
            }
      
        }
      }

      if (totalDates > 0) {
        results.push({
          saleExecutive,
          clave,
          totalDates,
        });
      }
    }

    return results;
  }

  private detectWalletByUser(id: number): string {
    const walletMap: Record<number, string> = {
      43: "P065",
      36: "359",
      46: "P419",
      51: "P470",
      47: "P471",
      45: "P501",
      27: "520",
      44: "P595",
      28: "P596",
      29: "P21",
      38: "P52",
      26: "P53",
    };
  
    return walletMap[id] ?? "";
  }
  
  private isAppointmentTypeValid(type: string): boolean {
    const validTypes = ['Presencial', 'Reunion Remota']; // ejemplo
    return validTypes.includes(type);
  }

  
}

export class InfoTableDatesDto {
  saleExecutive: string;
  clave: string;
  totalDates: number;
}
