import { Injectable } from '@nestjs/common';
import { CreateLeadHistoryDto } from './dto/create-lead-history.dto';
import { UpdateLeadHistoryDto } from './dto/update-lead-history.dto';

@Injectable()
export class LeadHistoryService {
  create(createLeadHistoryDto: CreateLeadHistoryDto) {
    return 'This action adds a new leadHistory';
  }

  findAll() {
    return `This action returns all leadHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leadHistory`;
  }

  update(id: number, updateLeadHistoryDto: UpdateLeadHistoryDto) {
    return `This action updates a #${id} leadHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} leadHistory`;
  }
}
