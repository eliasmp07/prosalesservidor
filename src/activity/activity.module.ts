import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { CustomersModule } from 'src/customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entity/customer.entity';
import { Activity } from './entities/activity.entity';

@Module({
  imports: [
    CustomersModule,
    TypeOrmModule.forFeature([
      Customer,
      Activity
    ])
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
