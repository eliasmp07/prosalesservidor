import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/message/entities/message.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { Customer } from 'src/customers/entity/customer.entity';
import { Conversation } from './entities/conversation.entity';
import { CalendarEvent } from 'src/calendar-event/entities/calendar-event.entity';

@Module({
   imports: [
      TypeOrmModule.forFeature([
         Message,
         User,
         Conversation,
         Customer,
         CalendarEvent
      ]),
      ConfigModule, // Importa ConfigModule aquí
    ],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {

}
