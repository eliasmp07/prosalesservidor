import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Customer } from './entity/customer.entity';
import { UsersController } from 'src/users/users.controller';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Interaction } from '../interation/entity/interation.entity';
import { Purchase } from '../purchase/entity/purchase.entity';
import { Reminder } from '../remider/entity/remider.entity';
import { PurchaseService } from 'src/purchase/purchase.service';
import { OportunityService } from 'src/oportunity/oportunity.service';
import { InterationService } from 'src/interation/interation.service';
import { RemiderService } from 'src/remider/remider.service';
import { InterationController } from 'src/interation/interation.controller';
import { PurchaseController } from 'src/purchase/purchase.controller';
import { RemiderController } from 'src/remider/remider.controller';
import { Opportunity } from 'src/oportunity/entity/oportunity.entity';
import { OportunityController } from 'src/oportunity/oportunity.controller';
import { Project } from 'src/projects/entities/project.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { AppointmentService } from 'src/appointment/appointment.service';
import { AppointmentController } from 'src/appointment/appointment.controller';
import { RolesModule } from 'src/roles/roles.module';
import { SucursalesModule } from 'src/sucursales/sucursales.module';
import { LeadHistory } from 'src/lead-history/entities/lead-history.entity';
import { MailService } from 'src/auth/service/MailService';

@Module({
  imports: [
    RolesModule,
    SucursalesModule,
    TypeOrmModule.forFeature([
      Customer,
      User,
      Opportunity,
      Interaction,
      Purchase,
      Reminder,
      Project,
      Appointment,
      LeadHistory
    ]),
    ConfigModule, // Importa ConfigModule aquí
  ],
  providers: [
    CustomersService,
    UsersService,
    PurchaseService,
    OportunityService,
    InterationService,
    RemiderService,
    MailService,
    AppointmentService,
  ],
  controllers: [
    CustomersController,
    UsersController,
    OportunityController,
    InterationController,
    PurchaseController,
    RemiderController,
    AppointmentController,
  ],
})
export class CustomersModule {}
