import { Body, Controller, Post } from '@nestjs/common';
import { InterationService } from './interation.service';
import { CreateInteractionDto } from './dto/create-interation.dto';
import { CreateOnlyInteractionDto } from './dto/create_only_interaction.dto';

@Controller('interation')
export class InterationController {

    constructor(
        private interactionService: InterationService
    ){}

    @Post('create')
    createInteraction(@Body() interactionDto: CreateOnlyInteractionDto){
        return this.interactionService.createInteraction(interactionDto)
    }
}
