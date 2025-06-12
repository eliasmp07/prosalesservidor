import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('create')
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @Get('findAllConversationsByUserExecutive/:id')
  findAllConversationsByUserExecutive(@Param('id', ParseIntPipe) id: number){
    return this.conversationService.finAllConversationsByUser(id)
  }

  @Get('findAllConversationByUserAdminId/:id')
  findAllConversationByUserAdminId(@Param('id', ParseIntPipe) id: number){
    return this.conversationService.finAllConversationsByManager(id)
  }

  @Get('findConversationById/:id')
  findConversationById(@Param('id', ParseIntPipe) id: number){
    return this.conversationService.findConversationById(id)
  }

  @Get()
  findAll() {
    return this.conversationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationService.remove(+id);
  }
}
