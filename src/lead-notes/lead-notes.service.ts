import { Injectable } from '@nestjs/common';
import { CreateLeadNoteDto } from './dto/create-lead-note.dto';
import { UpdateLeadNoteDto } from './dto/update-lead-note.dto';
import { Repository } from 'typeorm';
import { LeadNote } from './entities/lead-note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entity/customer.entity';
import { CustomersService } from 'src/customers/customers.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class LeadNotesService {

  constructor(
    @InjectRepository(LeadNote) private leadsNotesService: Repository<LeadNote>,
    @InjectRepository(Customer) private customerService: Repository<Customer>,
    @InjectRepository(User) private userService: Repository<User>
  ){}

  /**
   * Funcion que crea un nota para el lead
   * @param createLeadNoteDto Clase que contiene toda la informacion del lead 
   * @returns Retorna la nota ya creada 
   */
  async create(createLeadNoteDto: CreateLeadNoteDto) {

    //Busca al usuario
    const user = await this.userService.findOne({
      where: {
        id: createLeadNoteDto.userId
      }
    })

    //Busca al lead 
    const customer = await this.customerService.findOne({
      where: {
        customer_id: createLeadNoteDto.customerId
      }
    })

    //Crea la nota
    const leadNote = await this.leadsNotesService.save({
      content: createLeadNoteDto.content,
      author: user,
      customer: customer
    });

    return {
      id: leadNote.id,
      content: leadNote.content,
      created_at: leadNote.created_at,
      author: leadNote.author
    };
  }

  findAll() {
    return `This action returns all leadNotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leadNote`;
  }

  update(id: number, updateLeadNoteDto: UpdateLeadNoteDto) {
    return `This action updates a #${id} leadNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} leadNote`;
  }
}
