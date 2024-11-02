import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reminder } from './entity/remider.entity';
import { Repository } from 'typeorm';
import { CreateOnlyReminderDto } from './dto/create-only-reminder.dto';
import { Customer } from 'src/customers/entity/customer.entity';

@Injectable()
export class RemiderService {

    constructor(
        @InjectRepository(Reminder)
        private reminderRepository: Repository<Reminder>,
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>
    ){}

    async getAllReminders(){
        const reminders = await this.reminderRepository.find({
            relations: ['customer'],
        })
        return {
            reminders: reminders
        }
    }

    async getAllRemindersByUser(userId: number) {
        // Obtén los recordatorios con las relaciones necesarias
        const reminders = await this.reminderRepository.find({
            relations: ['customer', 'customer.user'],  // Incluye las relaciones necesarias
            where: {
                customer: {
                    user: {
                        id: userId,  // Filtra por el usuario
                    },
                },
            },
        });
    
        // Remueve la información del usuario de los resultados
        const filteredReminders = reminders.map(reminder => {
            // Elimina la relación `user` del `customer`
            const { customer, ...rest } = reminder;
            const { user, ...customerWithoutUser } = customer; // Elimina `user` de `customer`
            return { ...rest, customer: customerWithoutUser }; // Retorna el reminder sin el `user`
        });
    
        return {
            reminders: filteredReminders,
        };
    }
    
    async createReminder(createReminderDto: CreateOnlyReminderDto) {
        const { customerId, ...reminderData } = createReminderDto;

        // Corrige el método findOne para buscar el cliente por ID
        const customer = await this.customerRepository.findOne({ where: { customer_id: customerId} });
        if (!customer) {
            throw new NotFoundException(`Customer with id ${customerId} not found`);
        }

        const reminder = this.reminderRepository.create({
            ...reminderData,
            customer,
        });
        
        return this.reminderRepository.save(reminder);  // Guarda el recordatorio en la base de datos
    }
    
}
