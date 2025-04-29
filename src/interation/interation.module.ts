import { Module } from '@nestjs/common';
import { InterationService } from './interation.service';
import { InterationController } from './interation.controller';
import { CustomersService } from 'src/customers/customers.service';
import { UsersService } from 'src/users/users.service';
import { PurchaseService } from 'src/purchase/purchase.service';
import { OportunityService } from 'src/oportunity/oportunity.service';
import { PurchaseController } from 'src/purchase/purchase.controller';
import { OportunityController } from 'src/oportunity/oportunity.controller';
import { UsersController } from 'src/users/users.controller';
import { CustomersController } from 'src/customers/customers.controller';
import { Customer } from 'src/customers/entity/customer.entity';
import { User } from 'src/users/user.entity';
import { Opportunity } from 'src/oportunity/entity/oportunity.entity';
import { Interaction } from './entity/interation.entity';
import { Purchase } from 'src/purchase/entity/purchase.entity';
import { Reminder } from 'src/remider/entity/remider.entity';
import { RemiderService } from 'src/remider/remider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RemiderController } from 'src/remider/remider.controller';
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
      LeadHistory,
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
  ],
  controllers: [
    CustomersController,
    UsersController,
    OportunityController,
    InterationController,
    PurchaseController,
    RemiderController,
  ],
})
export class InterationModule {}
