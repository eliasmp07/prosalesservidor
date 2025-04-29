import { Module } from '@nestjs/common';
import { LeadHistoryService } from './lead-history.service';
import { LeadHistoryController } from './lead-history.controller';

@Module({
  controllers: [LeadHistoryController],
  providers: [LeadHistoryService],
})
export class LeadHistoryModule {}
