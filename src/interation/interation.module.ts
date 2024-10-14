import { Module } from '@nestjs/common';
import { InterationService } from './interation.service';
import { InterationController } from './interation.controller';

@Module({
  providers: [InterationService],
  controllers: [InterationController]
})
export class InterationModule {}
