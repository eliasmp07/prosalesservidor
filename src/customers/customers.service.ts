import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { User } from 'src/users/user.entity';
import { Reminder } from 'src/remider/entity/remider.entity';
import { Purchase } from 'src/purchase/entity/purchase.entity';
import { Interaction } from 'src/interation/entity/interation.entity';
import { Opportunity } from 'src/oportunity/entity/oportunity.entity';

@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
        @InjectRepository(Opportunity)
        private opportunitiesRepository: Repository<Opportunity>,
        @InjectRepository(Interaction)
        private interactionsRepository: Repository<Interaction>,
        @InjectRepository(Purchase)
        private purchasesRepository: Repository<Purchase>,
        @InjectRepository(Reminder)
        private remindersRepository: Repository<Reminder>,
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const { opportunities, interactions, purchases, reminders, ...customerData } = createCustomerDto;
    
        const user = await this.userRepository.findOne({where: {id: createCustomerDto.idUser}})  

        // Crear el cliente
        const customer = this.customersRepository.create(customerData);
        customer.user = user;

        await this.customersRepository.save(customer);
    
        // Crear las oportunidades relacionadas (si se proporcionaron)
        if (opportunities) {
          const opportunityEntities = opportunities.map(opportunityDto => {
            return this.opportunitiesRepository.create({
              ...opportunityDto,
              customer,
            });
          });
          await this.opportunitiesRepository.save(opportunityEntities);
        }
    
        // Crear las interacciones relacionadas (si se proporcionaron)
        if (interactions) {
          const interactionEntities = interactions.map(interactionDto => {
            return this.interactionsRepository.create({
              ...interactionDto,
              customer,
            });
          });
          await this.interactionsRepository.save(interactionEntities);
        }
    
        // Crear las compras relacionadas (si se proporcionaron)
        if (purchases) {
          const purchaseEntities = purchases.map(purchaseDto => {
            return this.purchasesRepository.create({
              ...purchaseDto,
              customer,
            });
          });
          await this.purchasesRepository.save(purchaseEntities);
        }
    
        // Crear los recordatorios relacionados (si se proporcionaron)
        if (reminders) {
          const reminderEntities = reminders.map(reminderDto => {
            return this.remindersRepository.create({
              ...reminderDto,
              customer,
            });
          });
          await this.remindersRepository.save(reminderEntities);
        }
    
        return customer;
      }


    async getMyCustomer(id: number){
        const getMyCustomers = await this.customersRepository.find({
            where: { user: { id } }, // Filtra por el id del usuario relacionado,
            relations: ['opportunities', 'interactions','purchases','reminders']
     
        });
        return { customers: getMyCustomers };
    }

    async getAllCustomer(){
        const customers = await this.customersRepository.find({
          relations: ['opportunities', 'interactions','purchases','reminders']
        })
        return {customers: customers}
    }
}
