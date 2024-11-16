import { Body, Controller, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Controller('purchase')
export class PurchaseController {
    constructor(
        private purchaseService: PurchaseService
    ){

    }

    @Post('create')
    createPurchase(@Body() purchaseDto: CreatePurchaseDto){
        return this.purchaseService.createPurchase(purchaseDto)
    }
}
