import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdateStatusCustomerDto } from './dto/update_status_customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get('findAll')
  findAll() {
    return this.customerService.findAll();
  }

  @Get('findAllCustomersByUserId/:id')
  findAllCustomerByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.findAllCustomerByUserId(id);
  }

  @Get('findById/:id')
  findById(@Param('id', ParseIntPipe) id: number){
    return this.customerService.findById(id)
  }

  @Post('createLead')
  createLead(@Body() customer: CreateCustomerDto) {
    this.customerService.createNewVersion(customer);
  }

  @Put('updateStatusManager')
  updateStatusManager(@Body() updateStatusCustomerDto: UpdateStatusCustomerDto){
     return this.customerService.updateStatusLead(updateStatusCustomerDto)
     
  }


  ///ALL
  
  @Post('create')
  create(@Body() customer: CreateCustomerDto) {
    this.customerService.create(customer);
  }

  @Get('getCustomerById/:customerId')
  getUserById(@Param('customerId') customerId: number) {
    return this.customerService.getCustomerById(customerId);
  }

  //This funtion remove dont work with new version
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

  //This function don´t work with the new version 
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
