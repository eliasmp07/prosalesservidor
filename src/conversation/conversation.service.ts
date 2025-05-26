import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Customer } from 'src/customers/entity/customer.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createConversationDto: CreateConversationDto) {
    const customerFound = await this.customerRepository.findOneBy({
      customer_id: createConversationDto.customerId,
    });

    const conversation = this.conversationRepository.create({
      customer: customerFound,
      ejecutivo: customerFound.user,
    });

    return await this.conversationRepository.save(conversation);
  }

  async finAllConversationsByUser(userId: number) {
    const conversationFound = await this.conversationRepository.find({
      where: {
        ejecutivo: {
          id: userId,
        },
      },
      relations: ['customer'],
    });

    return {
      conversations: conversationFound,
    };
  }

async findAllConversationByUserAdmin() {
  const conversationsWithMessages = await this.conversationRepository
    .createQueryBuilder('conversation')
    .leftJoinAndSelect('conversation.customer', 'customer')
    .leftJoinAndSelect('conversation.messages', 'messages')
    .leftJoinAndSelect('messages.sender', 'sender') // Asegura que el sender de cada mensaje se cargue
    .leftJoinAndSelect('conversation.ejecutivo', 'ejecutivo')
    .leftJoinAndSelect('conversation.admins', 'admins')
    .where('messages.id IS NOT NULL') // Solo conversaciones con al menos un mensaje
    .getMany();

  return {
    conversations: conversationsWithMessages,
  };
}


  async findConversationById(id: number) {
    const conversationFound = await this.conversationRepository.findOne({
      where: {
        customer: {
          customer_id: id,
        },
      },
      relations: ['customer'],
    });

    if (!conversationFound) {
      return {
        success: false,
        data: null,
      };
    }

    return {
      success: true,
      data: conversationFound,
    };
  }
  findAll() {
    return `This action returns all conversation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
