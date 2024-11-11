import { Injectable } from '@nestjs/common';
import { CreateSucursaleDto } from './dto/create-sucursale.dto';
import { UpdateSucursaleDto } from './dto/update-sucursale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sucursales } from './entities/sucursale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SucursalesService {

  constructor(
    @InjectRepository(Sucursales) private sucursalRepository: Repository<Sucursales>
  ){

  }

  create(createSucursaleDto: CreateSucursaleDto) {
    const newSucusal = this.sucursalRepository.create(createSucursaleDto);
    return this.sucursalRepository.save(newSucusal);
  }

  findAll() {
    return `This action returns all sucursales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sucursale`;
  }

  update(id: number, updateSucursaleDto: UpdateSucursaleDto) {
    return `This action updates a #${id} sucursale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sucursale`;
  }
}
