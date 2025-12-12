import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Order } from './entities/order.entity';
import { DeliveryLogin } from './entities/delivery-login.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Delivery, DeliveryLogin, Order])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
