import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {

    constructor(
        private customerService: CustomersService
    ){}

    @Post("create")
    create(@Body() customer: CreateCustomerDto){
        this.customerService.create(customer)
    }

    @Get('myCustomers/:id')
    findMyCustomers(@Param('id', ParseIntPipe) id: number){
        return this.customerService.getMyCustomer(id)
    }

    @Get("getAllCustomers")
    getAllCustomers(){
        return this.customerService.getAllCustomer()
    }

}
