import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { CreateSocketDto } from './dto/create-socket.dto';
import { Server, Socket } from 'socket.io';
import { UpdateSocketDto } from './dto/update-socket.dto';

@WebSocketGateway(
  {
    cors: {
      origin: '*'
    },
    transports: ['websocket']
  }
)
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect{
 
  @WebSocketServer() server: Server;

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
    @ConnectedSocket() client: Socket
  ) {
    console.log(`Usuario escribiendo: ${client.id}, data:`, data);
  
  
    // Notificar a todos excepto al que está escribiendo
    this.server.emit('user_typing', {
      userId: data.userId,
      typing: data.typing,
      userWriting: data.userWriting,
      customerId: data.customerId
    });
  }

  @SubscribeMessage('createNote')
  handleNewNote(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket
  ){
    console.log(`Nota creada: ${client.id}, data:`, data);
    this.server.emit('success_create', {
       id: data.id,
       content: data.content,
       customerId: data.customerId,
       name: data.name,
       userId: data.userId,
       image: data.image
    })
  }
  
}
