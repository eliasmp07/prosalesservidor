import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RefreshTokenStrategy } from 'src/auth/strategies/refreshToken.strategy';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy } from 'src/auth/strategies/jwt.strategy';
import { CustomersController } from 'src/customers/customers.controller';
import { CustomersService } from 'src/customers/customers.service';
import { Customer } from 'src/customers/entity/customer.entity';
import { OportunityService } from 'src/oportunity/oportunity.service';
import { PurchaseService } from 'src/purchase/purchase.service';
import { RemiderService } from 'src/remider/remider.service';
import { Purchase } from 'src/purchase/entity/purchase.entity';
import { Opportunity } from 'src/oportunity/entity/oportunity.entity';
import { Reminder } from 'src/remider/entity/remider.entity';
import { Interaction } from 'src/interation/entity/interation.entity';
import { RolesModule } from 'src/roles/roles.module';
import { SucursalesModule } from 'src/sucursales/sucursales.module';
import { LeadHistory } from 'src/lead-history/entities/lead-history.entity';
import { MailService } from 'src/auth/service/MailService';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { CalendarEvent } from 'src/calendar-event/entities/calendar-event.entity';

@Module({
  imports:[
    SucursalesModule,
    RolesModule,
    TypeOrmModule.forFeature([User, Customer, Purchase, Opportunity, Reminder, Interaction, LeadHistory,  Conversation, CalendarEvent]),
    ConfigModule, // Importa ConfigModule aquí,
  ],
  providers: [CustomersService, UsersService, AccessTokenStrategy, RefreshTokenStrategy, CustomersService, OportunityService, PurchaseService, RemiderService, MailService],
  controllers: [UsersController, CustomersController]
})
export class UsersModule {
    
}
