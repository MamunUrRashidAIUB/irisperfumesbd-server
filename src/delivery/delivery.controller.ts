import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/createDelivery.dto';
import { UpdateCountryDto } from './dto/updateCountry.dto';
import { CreateOrderDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';
import { ForbiddenException } from '@nestjs/common';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() dto: CreateDeliveryDto) {
    return this.deliveryService.create(dto);
  }

  @Patch(':id/country')
  updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCountryDto,
  ) {
    return this.deliveryService.updateCountry(id, body.country);
  }

  @Get()
  findAll() {
    return this.deliveryService.findAll();
  }

  @Get('by-date')
  getByDate(@Query('date') date: string) {
    return this.deliveryService.findByDate(date);
  }

  @Get('unknown')
  getUnknown() {
    return this.deliveryService.findUnknownCountry();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateFull(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateDeliveryDto,
  ) {
    return this.deliveryService.updateFull(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
  const user = req.user as any;
  if (user.deliveryId !== id) {
    throw new ForbiddenException('Not allowed');
  }

    return this.deliveryService.remove(id);
 }

  @UseGuards(JwtAuthGuard)
  @Post(':id/orders')
   createOrder(
   @Param('id', ParseIntPipe) id: number,
   @Body() dto: CreateOrderDto,
   @Req() req: Request,
 ) {
  const user = req.user as any;
  if (user.deliveryId !== id) {
    throw new ForbiddenException('Not allowed to create orders for others');
  }

    return this.deliveryService.createOrder(id, dto);
}

 @UseGuards(JwtAuthGuard)
@Get(':id/orders')
getOrders(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
  const user = req.user as any;
  if (user.deliveryId !== id) {
    throw new ForbiddenException('Not allowed to view others orders');
  }

  return this.deliveryService.getOrdersForDelivery(id);
}

  @UseGuards(JwtAuthGuard)
  @Delete('order/:orderId')
  deleteOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Req() req: Request,
  ) {
   
    return this.deliveryService.deleteOrder(orderId);
  }

  @Post(':id/login')
  createLogin(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { email: string; password: string },
  ) {
    return this.deliveryService.createLoginForDelivery(
      id,
      body.email,
      body.password,
    );
  }

@UseGuards(JwtAuthGuard)
@Get(':id/login')
getLogin(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
  const user = req.user as any;
  if (user.deliveryId !== id) {
    throw new ForbiddenException('Not allowed to view login of others');
  }

  return this.deliveryService.getLoginByDelivery(id);
}

@Get('order/:orderId')
getSingleOrder(@Param('orderId', ParseIntPipe) orderId: number) {
  return this.deliveryService.getOrderWithDelivery(orderId);
}

}
