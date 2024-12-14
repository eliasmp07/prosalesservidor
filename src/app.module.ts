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

@Module({
  imports: [
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
    BannersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
