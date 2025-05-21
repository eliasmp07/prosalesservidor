import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateSocketDto } from './dto/create-socket.dto';
import { Server, Socket } from 'socket.io';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { MessageService } from 'src/message/message.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  // Mapa para guardar socket.id => { userId, conversationId }
  private readonly socketUserMap = new Map<
    string,
    { userId: number; conversationId: number }
  >();

  private readonly logger = new Logger(SocketGateway.name);

  constructor(private readonly messageService: MessageService) {}

  handleDisconnect(client: Socket) {
    console.log('Un usuario se ha desconectado de SOCKET.IO', client.id);
    this.server.emit('driver_disconnected', { id_socket: client.id });
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Un usuario se ha conectado a SOCKET.IO', client.id);
  }

  @SubscribeMessage('user_typing')
  handleUserTyping(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Usuario escribiendo: ${client.id}, data:`, data);

    // Notificar a todos excepto al que está escribiendo
    this.server.emit('user_typing', {
      userId: data.userId,
      typing: data.typing,
      userWriting: data.userWriting,
      customerId: data.customerId,
    });
  }

  @SubscribeMessage('createNote')
  handleNewNote(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`Nota creada: ${client.id}, data:`, data);
    this.server.emit('success_create', {
      id: data.id,
      content: data.content,
      customerId: data.customerId,
      name: data.name,
      userId: data.userId,
      image: data.image,
    });
  }

  @SubscribeMessage('readingNotifications')
  readingNotifications(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Notificaciones: ${client.id}, data:`, data);
    this.server.emit('reading', { userId: data.userId });
  }
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() rawData: any,
    @ConnectedSocket() client: Socket,
  ) {
    // Parseo de datos
    const data = Array.isArray(rawData)
      ? rawData.find((item) => typeof item === 'object' && item !== null)
      : rawData;

    this.logger.log('📨 Mensaje recibido:', data);

    const socketInfo = this.socketUserMap.get(client.id);
    if (!socketInfo) {
      this.logger.warn(`⚠️ Cliente ${client.id} no tiene info registrada`);
      return;
    }

    const senderUserId = socketInfo.userId;
    const conversationId = data.conversationId;

    // Si alguien está en la conversación, marcar como leído automáticamente
    const socketsInRoom = await this.server
      .in(`conversation-${conversationId}`)
      .fetchSockets();
    const activeUserIds = socketsInRoom
      .map((socket) => this.socketUserMap.get(socket.id)?.userId)
      .filter((id): id is number => !!id && id !== senderUserId);

    // Este valor sirve para cuando creas el mensaje (por ejemplo para mostrar "leído" instantáneo)
    const isAnyoneViewing = activeUserIds.length > 0;
    data.isRead = isAnyoneViewing;

    // Crear el mensaje
    const message = await this.messageService.create({
      ...data,
      userSenderId: senderUserId,
    });

    // Notificar por roles
    const conversation =
      await this.messageService.findConversationById(conversationId);
    if (data.rolUser == 'Gerente' || data.rolUser == 'Gerente regional') {
      this.server
        .to(`notification-${conversation.ejecutivo.id}`)
        .emit('Notification', message);
    } else {
      conversation.admins.forEach((admin) => {
        this.server
          .to(`notification-${admin.id}`)
          .emit('Notification', message);
      });
    }

    // Emitir el mensaje en la conversación
    this.server.to(`conversation-${conversationId}`).emit('newMessage', {
      conversationId,
      message,
    });

    this.server.emit('newMessage', {
      conversationId,
      message,
    });

    // 🔽 Marcar como leídos para todos los conectados menos el emisor
    const markedUsers = new Set<number>();
    for (const userId of activeUserIds) {
      if (!markedUsers.has(userId)) {
        const updatedMessages = await this.messageService.markMessagesAsRead(
          conversationId,
          userId,
        );
        this.server.to(`conversation-${conversationId}`).emit('messagesRead', {
          conversationId,
          userId,
          messageIds: updatedMessages.map((m) => m.id),
        });
        markedUsers.add(userId);
      }
    }
  }

  @SubscribeMessage('joinConversation')
  async handleJoinRoom(
    @MessageBody() data: { conversationId: number; userId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const { conversationId, userId } = data;

    // Unir al socket a la sala de conversación
    client.join(`conversation-${conversationId}`);
    this.socketUserMap.set(client.id, { userId, conversationId });

    this.logger.log(
      `✅ Cliente ${client.id} (usuario ${userId}) se unió a conversación ${conversationId}`,
    );

    // 🔽 Marcar como leídos los mensajes pendientes
    const updatedMessages = await this.messageService.markMessagesAsRead(
      conversationId,
      userId,
    );

    // Emitir evento al socket individual
    this.server.to(`conversation-${conversationId}`).emit('messagesRead', {
      conversationId,
      userId,
      messageIds: updatedMessages.map((m) => m.id),
    });
  }

  @SubscribeMessage('listernersNotification')
  handleJoinRoomNotification(
    @MessageBody() userId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`notification-${userId}`);
    console.log(`Client ${client.id} joined notification ${userId}`);
  }

  @SubscribeMessage('leaveConversation')
  handleLeaveRoom(
    @MessageBody() conversationId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`conversation-${conversationId}`);
     this.logger.log(
      `⛓️‍💥 Client ${client.id} left conversation ${conversationId}`,
    );
  }
}
