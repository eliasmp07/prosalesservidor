import { Controller, Get } from '@nestjs/common';
import { RemiderService } from './remider.service';

@Controller('remider')
export class RemiderController {

    constructor(
        private reminderService: RemiderService
    ){}

    @Get('getAllReminders')
    getAllReminders(){
        return this.reminderService.getAllReminders()
    }
}
