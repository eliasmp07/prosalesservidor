import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
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

    @Get('getMyReminders/:id')
    getAllMyReminders(@Param('id', ParseIntPipe) id: number){
        return this.reminderService.getAllRemindersByUser(id)
    }
}
