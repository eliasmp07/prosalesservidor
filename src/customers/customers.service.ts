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
import { UpdateCustomerDto } from './dto/update-customer.dto';

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

      async getCustomerById(customerId: number) {
        const customer = await this.customersRepository.findOne({
          relations: ['opportunities', 'interactions','purchases','reminders'],
            where: {
                customer_id: customerId
            }
        });
    
        return customer; // Es buena práctica devolver o manejar el valor encontrado.
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

    async updateCustomer(idCustomer: number, updateCustomerDto: UpdateCustomerDto) {
      const customer = await this.customersRepository.findOneBy({
          customer_id: idCustomer
      });
  
      // Use `updateCustomerDto` directly to set fields
      customer.address = updateCustomerDto.address;
      customer.company_name = updateCustomerDto.company_name;
      customer.contact_name = updateCustomerDto.contact_name;
      customer.email = updateCustomerDto.email;
      customer.type_of_client = updateCustomerDto.type_of_client;
  
      // Assign updated fields to `customer` and rename the result variable
      const updatedCustomer = Object.assign(customer, updateCustomerDto);
      await this.customersRepository.save(updatedCustomer);
  }
  
}
