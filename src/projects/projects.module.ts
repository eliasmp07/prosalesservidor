import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from 'src/purchase/entity/purchase.entity';
import { Customer } from 'src/customers/entity/customer.entity';
import { Project } from './entities/project.entity';
import { Opportunity } from 'src/oportunity/entity/oportunity.entity';
import { Interaction } from 'src/interation/entity/interation.entity';
import { Reminder } from 'src/remider/entity/remider.entity';
import { User } from 'src/users/user.entity';
import { PurchaseService } from 'src/purchase/purchase.service';
import { PurchaseController } from 'src/purchase/purchase.controller';
import { CustomersController } from 'src/customers/customers.controller';
import { CustomersService } from 'src/customers/customers.service';
import { OportunityService } from 'src/oportunity/oportunity.service';
import { OportunityController } from 'src/oportunity/oportunity.controller';
import { InterationService } from 'src/interation/interation.service';
import { RemiderService } from 'src/remider/remider.service';
import { UsersService } from 'src/users/users.service';
import { InterationController } from 'src/interation/interation.controller';
import { RemiderController } from 'src/remider/remider.controller';
import { UsersController } from 'src/users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { PurchaseModule } from 'src/purchase/purchase.module';
import { ProjectCancellation } from './entities/projectCancellation.entity';
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
      Project,
      Purchase,
      Customer,
      Opportunity,
      Interaction,
      Reminder,
      CalendarEvent,
       Conversation,
      User,
      ProjectCancellation,
      LeadHistory
    ]),
    ConfigModule,
    PurchaseModule, // Importar el PurchaseModule aquí
  ],
  controllers: [
    ProjectsController,
    CustomersController,
    OportunityController,
    InterationController,
    RemiderController,
    UsersController,
  ],
  providers: [
    ProjectsService,
    CustomersService,
    OportunityService,
    InterationService,
    RemiderService,
    UsersService,
    MailService
  ],
})
export class ProjectsModule {}
