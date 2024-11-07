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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'ls-d15d7c88b665b422df22d34c558f4a76fb630807.cpmyqs2ek0ii.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: 'root',
      password: 'optivosa1',
      database: 'prosales',
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
    RemiderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
