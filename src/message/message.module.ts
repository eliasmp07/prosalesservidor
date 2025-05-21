import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { ConversationService } from 'src/conversation/conversation.service';
import { User } from 'src/users/user.entity';
import { Message } from './entities/message.entity';

@Module({
   imports: [
        TypeOrmModule.forFeature([
           Conversation,
           User,
           Message
        ]),
        ConfigModule, // Importa ConfigModule aquí
      ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
