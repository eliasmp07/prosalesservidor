import { Module } from '@nestjs/common';
import { SucursalesService } from './sucursales.service';
import { SucursalesController } from './sucursales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sucursales } from './entities/sucursale.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Sucursales])],
  controllers: [SucursalesController],
  providers: [SucursalesService],
})
export class SucursalesModule {}
