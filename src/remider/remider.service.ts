import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reminder } from './entity/remider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RemiderService {

    constructor(
        @InjectRepository(Reminder)
        private reminderRepository: Repository<Reminder>
    ){}

    async getAllReminders(){
        const reminders = await this.reminderRepository.find({
            relations: ['customer'],
        })
        return {
            reminders: reminders
        }
    }
}
