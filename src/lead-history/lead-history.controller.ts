import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeadHistoryService } from './lead-history.service';
import { CreateLeadHistoryDto } from './dto/create-lead-history.dto';
import { UpdateLeadHistoryDto } from './dto/update-lead-history.dto';

@Controller('lead-history')
export class LeadHistoryController {
  constructor(private readonly leadHistoryService: LeadHistoryService) {}

  @Post()
  create(@Body() createLeadHistoryDto: CreateLeadHistoryDto) {
    return this.leadHistoryService.create(createLeadHistoryDto);
  }

  @Get()
  findAll() {
    return this.leadHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadHistoryDto: UpdateLeadHistoryDto) {
    return this.leadHistoryService.update(+id, updateLeadHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadHistoryService.remove(+id);
  }
}
