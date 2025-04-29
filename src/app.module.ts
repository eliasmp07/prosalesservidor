import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { CustomersModule } from './customers/customers.module';
import { OportunityModule } from './oportunity/oportunity.module';
import { InterationModule } from './interation/interation.module';
import { PurchaseModule } from './purchase/purchase.module';
import { RemiderModule } from './remider/remider.module';
import { RolesModule } from './roles/roles.module';
import { SucursalesModule } from './sucursales/sucursales.module';
import { ProjectsModule } from './projects/projects.module';
import { DocumentsPdfModule } from './documents-pdf/documents-pdf.module';
import { BannersModule } from './banners/banners.module';
import { AppointmentModule } from './appointment/appointment.module';
import { TaskService } from './task/task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailService } from './auth/service/MailService';
import { ActivityModule } from './activity/activity.module';
import { LeadHistoryModule } from './lead-history/lead-history.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST_DB,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PassportModule,
    CustomersModule,
    OportunityModule,
    InterationModule,
    PurchaseModule,
    RemiderModule,
    SucursalesModule,
    ProjectsModule,
    DocumentsPdfModule,
    BannersModule,
    AppointmentModule,
    ActivityModule,
    LeadHistoryModule
  ],
  controllers: [AppController],
  providers: [AppService, TaskService, MailService],
})
export class AppModule {}
