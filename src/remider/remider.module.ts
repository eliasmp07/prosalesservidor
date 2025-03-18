import { Module } from '@nestjs/common';
import { RemiderService } from './remider.service';
import { RemiderController } from './remider.controller';
import { Customer } from 'src/customers/entity/customer.entity';
import { User } from 'src/users/user.entity';
import { Opportunity } from 'src/oportunity/entity/oportunity.entity';
import { Interaction } from 'src/interation/entity/interation.entity';
import { Purchase } from 'src/purchase/entity/purchase.entity';
import { Reminder } from './entity/remider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CustomersService } from 'src/customers/customers.service';
import { UsersService } from 'src/users/users.service';
import { PurchaseService } from 'src/purchase/purchase.service';
import { OportunityService } from 'src/oportunity/oportunity.service';
import { InterationService } from 'src/interation/interation.service';
import { PurchaseController } from 'src/purchase/purchase.controller';
import { InterationController } from 'src/interation/interation.controller';
import { OportunityController } from 'src/oportunity/oportunity.controller';
import { UsersController } from 'src/users/users.controller';
import { CustomersController } from 'src/customers/customers.controller';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { AppointmentService } from 'src/appointment/appointment.service';
import { AppointmentController } from 'src/appointment/appointment.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([Customer, User, Opportunity, Interaction, Purchase, Reminder, Appointment]),
    ConfigModule, // Importa ConfigModule aquí
  ],
  providers: [CustomersService, UsersService, PurchaseService, OportunityService, InterationService, RemiderService, AppointmentService],
  controllers: [CustomersController, UsersController, OportunityController, InterationController, PurchaseController, RemiderController, AppointmentController],
  exports: [RemiderService], 

})
export class RemiderModule {}
