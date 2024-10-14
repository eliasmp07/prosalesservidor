import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RefreshTokenStrategy } from 'src/auth/strategies/refreshToken.strategy';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy } from 'src/auth/jwt.strategy';
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

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Customer, Purchase, Opportunity, Reminder, Interaction]),
    ConfigModule, // Importa ConfigModule aquí,
  ],
  providers: [CustomersService, UsersService, AccessTokenStrategy, RefreshTokenStrategy, CustomersService, OportunityService, PurchaseService, RemiderService],
  controllers: [UsersController, CustomersController]
})
export class UsersModule {
    
}
