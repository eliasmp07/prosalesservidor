import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entity/purchase.entity';
import { Customer } from 'src/customers/entity/customer.entity';
import { CustomersService } from 'src/customers/customers.service';
import { CustomersController } from 'src/customers/customers.controller';
import { ConfigModule } from '@nestjs/config';
import { OportunityController } from 'src/oportunity/oportunity.controller';
import { OportunityService } from 'src/oportunity/oportunity.service';
import { Opportunity } from 'src/oportunity/entity/oportunity.entity';
import { InterationController } from 'src/interation/interation.controller';
import { Interaction } from 'src/interation/entity/interation.entity';
import { InterationService } from 'src/interation/interation.service';
import { RemiderController } from 'src/remider/remider.controller';
import { RemiderService } from 'src/remider/remider.service';
import { Reminder } from 'src/remider/entity/remider.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { Project } from 'src/projects/entities/project.entity';
import { RolesModule } from 'src/roles/roles.module';
import { SucursalesModule } from 'src/sucursales/sucursales.module';
import { LeadHistory } from 'src/lead-history/entities/lead-history.entity';
import { MailService } from 'src/auth/service/MailService';
import { Conversation } from 'src/conversation/entities/conversation.entity';

@Module({
  imports: [
    RolesModule,
    SucursalesModule,
    TypeOrmModule.forFeature([
      Purchase,
      LeadHistory,
      Customer,
      Opportunity,
      Interaction,
      Reminder,
      User,
      Project,
       Conversation
    ]),
    ConfigModule,
  ],
  providers: [
    PurchaseService,
    CustomersService,
    OportunityService,
    InterationService,
    RemiderService,
    UsersService,
    PurchaseModule,
    MailService
  ],
  controllers: [
    PurchaseController,
    CustomersController,
    OportunityController,
    InterationController,
    RemiderController,
    UsersController,
  ],
})
export class PurchaseModule {}
