import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interaction } from './entity/interation.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customers/entity/customer.entity';
import { CreateOnlyInteractionDto } from './dto/create_only_interaction.dto';

@Injectable()
export class InterationService {
    constructor(
        @InjectRepository(Interaction) private interactionRepository: Repository<Interaction>,
        @InjectRepository(Customer) private customersRepository: Repository<Customer>,
    ){}

    async createInteraction(interaction: CreateOnlyInteractionDto) {
        const customer = await this.customersRepository.findOne({
            where: { customer_id: interaction.customerId }
        });
    
        const interactions = this.interactionRepository.create({
            interaction_id: interaction.interaction_id,
            interaction_type: interaction.interaction_type,
            interaction_date: interaction.interaction_date,
            notes: interaction.notes,
            customer: customer
        });
    
        return this.interactionRepository.save(interactions);
    }
}
