import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Post('createLead')
  createLead(@Body() customer: CreateCustomerDto) {
    this.customerService.createNewVersion(customer);
  }

  @Post('create')
  create(@Body() customer: CreateCustomerDto) {
    this.customerService.create(customer);
  }

  @Get('getCustomerById/:customerId')
  getUserById(@Param('customerId') customerId: number) {
    return this.customerService.getCustomerById(customerId);
  }

  @Get('myCustomers/:id')
  findMyCustomers(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.getMyCustomer(id);
  }

  @Get('getCategorizedCustomers')
  getCategorizedCustomer() {
    return this.customerService.categorizeLeads();
  }

  @Get('getFunnerChartByBranch/:branch')
  findFunnerChartByBranch(@Param('branch') branch: string){
     return this.customerService.getFunnerCharByBrach(branch)
  }

  @Get('getAllCustomers')
  getAllCustomers() {
    return this.customerService.getAllCustomer();
  }

  @Post('updateCustomer/:customerId')
  updateCustomer(
    @Param('customerId') id: number,
    @Body() updateCustomer: UpdateCustomerDto,
  ) {
    this.customerService.updateCustomer(id, updateCustomer);
  }
}
