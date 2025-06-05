import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entity/customer.entity';
import { Appointment } from './entities/appointment.entity';
import { ConfigModule } from '@nestjs/config';
import { CustomersService } from 'src/customers/customers.service';
import { CustomersController } from 'src/customers/customers.controller';
import { PurchaseService } from 'src/purchase/purchase.service';
import { OportunityService } from 'src/oportunity/oportunity.service';
import { InterationService } from 'src/interation/interation.service';
import { RemiderService } from 'src/remider/remider.service';
import { OportunityController } from 'src/oportunity/oportunity.controller';
import { InterationController } from 'src/interation/interation.controller';
import { PurchaseController } from 'src/purchase/purchase.controller';
import { RemiderController } from 'src/remider/remider.controller';
import { Reminder } from 'src/remider/entity/remider.entity';
import { Opportunity } from 'src/oportunity/entity/oportunity.entity';
import { Interaction } from 'src/interation/entity/interation.entity';
import { Purchase } from 'src/purchase/entity/purchase.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { SucursalesModule } from 'src/sucursales/sucursales.module';
import { RolesModule } from 'src/roles/roles.module';
import { LeadHistory } from 'src/lead-history/entities/lead-history.entity';
import { MailService } from 'src/auth/service/MailService';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { CalendarEvent } from 'src/calendar-event/entities/calendar-event.entity';

@Module({
  imports: [
     RolesModule,
        SucursalesModule,
    TypeOrmModule.forFeature([
      Customer, Appointment, Reminder, Opportunity, Interaction, Purchase, User, LeadHistory,  Conversation, CalendarEvent
    ]),
    ConfigModule
  ],
  providers: [AppointmentService, CustomersService, PurchaseService, OportunityService, InterationService, RemiderService, UsersService, MailService],
  controllers: [AppointmentController, CustomersController, OportunityController, InterationController, PurchaseController, RemiderController ]
})
export class AppointmentModule {}
