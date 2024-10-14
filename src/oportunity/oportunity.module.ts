import { Module } from '@nestjs/common';
import { OportunityService } from './oportunity.service';
import { OportunityController } from './oportunity.controller';
import { Customer } from 'src/customers/entity/customer.entity';
import { User } from 'src/users/user.entity';
import { Opportunity } from 'src/oportunity/entity/oportunity.entity';
import { Interaction } from 'src/interation/entity/interation.entity';
import { Purchase } from 'src/purchase/entity/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CustomersService } from 'src/customers/customers.service';
import { UsersService } from 'src/users/users.service';
import { PurchaseService } from 'src/purchase/purchase.service';
import { InterationService } from 'src/interation/interation.service';
import { PurchaseController } from 'src/purchase/purchase.controller';
import { InterationController } from 'src/interation/interation.controller';
import { UsersController } from 'src/users/users.controller';
import { CustomersController } from 'src/customers/customers.controller';
import { Reminder } from 'src/remider/entity/remider.entity';
import { RemiderService } from 'src/remider/remider.service';
import { RemiderController } from 'src/remider/remider.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([Customer, User, Opportunity, Interaction, Purchase, Reminder]),
    ConfigModule, // Importa ConfigModule aquí
  ],
  providers: [CustomersService, UsersService, PurchaseService, OportunityService, InterationService, RemiderService],
  controllers: [CustomersController, UsersController, OportunityController, InterationController, PurchaseController, RemiderController]

})
export class OportunityModule {}
