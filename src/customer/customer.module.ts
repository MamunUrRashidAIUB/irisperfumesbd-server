import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

import { UserModule } from './user.module';
@Module({
  imports: [TypeOrmModule.forFeature([]), UserModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}