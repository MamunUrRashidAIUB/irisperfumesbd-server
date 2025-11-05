import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/createDelivery.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  create(@Body() dto: CreateDeliveryDto) {
    return this.deliveryService.create(dto);
  }

  @Get()
  findAll() {
    return this.deliveryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.deliveryService.findOne(Number(id));
  }

  @Put(':id/assign')
  assign(@Param('id') id: number, @Body('deliveryPerson') deliveryPerson: string) {
    return this.deliveryService.assignDeliveryPerson(Number(id), deliveryPerson);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.deliveryService.updateStatus(Number(id), status);
  }

  @Patch(':id/location')
  updateLocation(@Param('id') id: number, @Body('currentLocation') currentLocation: string) {
    return this.deliveryService.updateLocation(Number(id), currentLocation);
  }

  @Get('customer/:customerId')
  findByCustomer(@Param('customerId') customerId: string) {
    return this.deliveryService.findByCustomer(Number(customerId));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryService.remove(Number(id));
  }

  @Get('filter')
  filterDeliveries(@Query('status') status: string) {
   return this.deliveryService.filterByStatus(status);
 }

}
