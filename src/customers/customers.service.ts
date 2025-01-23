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
        
        await this.customersRepository.save(customer); // Persistir el progreso calculado
    
        return customer; 
    }
    
  
    async getMyCustomer(id: number) {
      const getMyCustomers = await this.customersRepository.find({
          where: { user: { id } }, // Filtra por el id del usuario relacionado,
          relations: ['opportunities', 'interactions', 'purchases', 'reminders']
      });
  
      // Usar map para calcular el progreso y actualizar al mismo tiempo
      const updatedCustomers = await Promise.all(
          getMyCustomers.map(async (customer) => {
              customer.calculateProgress(id);
              return this.customersRepository.save(customer); // Guardar los cambios
          })
      );
      return { customers: updatedCustomers };
  }
  
  async getAllCustomersBySucursal(){
    const customers = await this.customersRepository.find({
      relations: ['opportunities', 'interactions', 'purchases', 'reminders', 'projects' ,'user.sucursales']
  });
    
  }
  /*
  async categorizeLeads() {
    const customers = await this.customersRepository.find({
        relations: ['opportunities', 'interactions', 'purchases', 'reminders', 'projects']
    });

    // Categorías de clientes
    const categorizedLeads = {
        total: customers.length,
        contactado: [],
        interesado: [],
        negociacion: [],
        cerrado: []
    };

    customers.forEach((customer) => {
        if (customer.progressLead === 100) {
            categorizedLeads.cerrado.push(customer);
        } else if (
            customer.projects.some(project => project.status === 'En negociacion')
        ) {
            categorizedLeads.negociacion.push(customer);
        } else if (customer.purchases && customer.purchases.length > 0) {
            categorizedLeads.interesado.push(customer);
        } else if (customer.interactions && customer.interactions.length > 0) {
            categorizedLeads.contactado.push(customer);
        }
    });

    return categorizedLeads;
}
*/
async  categorizeLeads() {
  const customers = await this.customersRepository.find({
      relations: ['opportunities', 'interactions', 'purchases', 'reminders', 'projects']
  });

  const funnelData = {
      prospectos: customers.length,
      contactados: customers.filter(c => c.interactions && c.interactions.length > 0).length,
      interesados: customers.filter(c => c.purchases && c.purchases.length > 0).length,
      negociacion: customers.filter(c => c.projects.some(p => p.status === 'En negociacion')).length,
      cerrados: customers.filter(c => c.projects.some(p => p.status === 'Cierre') || c.progressLead === 100).length,
  };

  return funnelData;
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
