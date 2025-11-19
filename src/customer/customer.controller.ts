import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, UploadedFile,UseInterceptors, } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { NameValidationPipe } from './pipes/name.validation.pipe';
import { PasswordValidationPipe } from './pipes/password.validation.pipe';
import { PhoneValidationPipe } from './pipes/phone.validation.pipe';
import {PdfValidationPipe } from './pipes/pdf.validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  //  Customer signs up or is created
  @Post()
  register(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.register(createCustomerDto);
  }

  //  Customers can search products or filter their own info
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  //  Customers can update their own profile
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: CreateCustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }

  //  Partial profile update
  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() partialCustomerDto: Partial<CreateCustomerDto>) {
    return this.customerService.partialUpdate(id, partialCustomerDto);
  }

  //  Remove account (optional, for demo)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }

  //  View own orders
  @Get(':id/orders')
  getOrders(@Param('id') id: string) {
    return this.customerService.getOrders(id);
  }

  //  Add product to wishlist
  @Post(':id/wishlist')
  addToWishlist(@Param('id') id: string, @Body('productId') productId: string) {
    return this.customerService.addToWishlist(id, productId);
  }
  @UsePipes(NameValidationPipe, PasswordValidationPipe, PhoneValidationPipe)
@Post()
create(@Body() dto: CreateCustomerDto) {
  return this.customerService.register(dto);
}


@UseInterceptors(FileInterceptor('file'))
@Post('upload')
uploadPdf(@UploadedFile(PdfValidationPipe) file: Express.Multer.File) {
  return { message: 'PDF uploaded successfully' };
}



}
