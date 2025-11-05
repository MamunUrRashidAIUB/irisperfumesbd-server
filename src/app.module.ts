import { Module } from '@nestjs/common';
import { DeliveryModule } from './delivery/delivery.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DeliveryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
