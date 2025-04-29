import { PartialType } from '@nestjs/mapped-types';
import { CreateLeadHistoryDto } from './create-lead-history.dto';

export class UpdateLeadHistoryDto extends PartialType(CreateLeadHistoryDto) {}
