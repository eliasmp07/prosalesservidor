import { Module } from '@nestjs/common';
import { SucursalesService } from './sucursales.service';
import { SucursalesController } from './sucursales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sucursales } from './entities/sucursale.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Sucursales])],
  controllers: [SucursalesController],
  providers: [SucursalesService],
})
export class SucursalesModule {}
