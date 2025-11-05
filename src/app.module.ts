import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [SellerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
