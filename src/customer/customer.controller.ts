import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, UploadedFile,UseInterceptors, BadRequestException, } from '@nestjs/common';
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
@UseInterceptors(FileInterceptor('file'))
async createCustomer(
  @UploadedFile() file: Express.Multer.File,
  @Body() body: any, 
) {
  // Merge form-data and file into one object
  const dto: CreateCustomerDto & { file?: Express.Multer.File } = { ...body, file };

  // Apply your existing pipes manually
  new NameValidationPipe().transform(dto);
  new PasswordValidationPipe().transform(dto);
  new PhoneValidationPipe().transform(dto);

  // PDF validation
  if (!file) throw new BadRequestException('PDF file is required');
  if (!file.mimetype.includes('pdf')) throw new BadRequestException('Only PDF files allowed');

  const customer = this.customerService.create(dto);

 
  return {
    message: 'Customer created successfully',
    data: {
      id: customer.data.id,
      name: customer.data.name,
      email: customer.data.email,
      fileName: file.originalname, 
    },
  };
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
//   @UsePipes(NameValidationPipe, PasswordValidationPipe, PhoneValidationPipe)
// @Post()
// create(@Body() dto: CreateCustomerDto) {
//   return this.customerService.register(dto);
// }



// @Post('upload')
// @UseInterceptors(FileInterceptor('file'))
// uploadPdf(@UploadedFile(PdfValidationPipe) file: Express.Multer.File) {
//   return { message: 'PDF uploaded successfully' };
// }



}