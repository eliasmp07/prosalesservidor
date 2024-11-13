import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RemiderService } from './remider.service';
import { CreateOnlyReminderDto } from './dto/create-only-reminder.dto';
import { UpdateReminderDto } from './dto/update_reminder.dto';

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

    @Post('create')
    createReminder(@Body() createReminderDto: CreateOnlyReminderDto) {
        return this.reminderService.createReminder(createReminderDto);  // Llama al servicio para crear un recordatorio
    }

    @Post("update/:reminderId")
    updateReminder(@Param('reminderId') id: number, @Body() updateReminder: UpdateReminderDto){
        this.reminderService.updateReminder(id, updateReminder)
    }
}
