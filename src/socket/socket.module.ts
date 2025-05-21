import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { MessageService } from 'src/message/message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Message } from 'src/message/entities/message.entity';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { User } from 'src/users/user.entity';

@Module({
   imports: [
        TypeOrmModule.forFeature([
          User,
           Message,
           Conversation
        ]),
        ConfigModule, // Importa ConfigModule aquí
      ],
  providers: [SocketGateway, MessageService],
})
export class SocketModule {}
