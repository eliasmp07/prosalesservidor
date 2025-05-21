import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { LeadNotesService } from './lead-notes.service';
import { CreateLeadNoteDto } from './dto/create-lead-note.dto';
import { UpdateLeadNoteDto } from './dto/update-lead-note.dto';

@Controller('lead-notes')
export class LeadNotesController {
  constructor(private readonly leadNotesService: LeadNotesService) {}

  @Post('create')
  create(@Body() createLeadNoteDto: CreateLeadNoteDto) {
    return this.leadNotesService.create(createLeadNoteDto);
  }

  @Get('findAllNotesUnread/:id')
  findAllNotesUnread(@Param('id', ParseIntPipe) id: number) {
    return this.leadNotesService.getUnreadNotesForUser(id);
  }

  @Post('markReaded/:id')
  markReadingNotificacion(@Param('id', ParseIntPipe) id: number) {
    return this.leadNotesService.getUnreadNotesForUser(id);
  }

  @Post('markAllAsReadForUser/:id')
  markAllAsReadForUser(@Param('id', ParseIntPipe) id: number) {
    return this.leadNotesService.markAllAsReadForUser(id)
  }
  @Get()
  findAll() {
    return this.leadNotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadNotesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeadNoteDto: UpdateLeadNoteDto,
  ) {
    return this.leadNotesService.update(+id, updateLeadNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadNotesService.remove(+id);
  }
}
