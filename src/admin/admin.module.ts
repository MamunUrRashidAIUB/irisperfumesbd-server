import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Admin } from './entity/admin.entity';
import { Product } from './entity/product.entity';
import { AdminProfile } from './entity/admin-profile.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin, Product, AdminProfile]), AuthModule],
  controllers: [AdminController, UserController, ProductController, ProfileController],
  providers: [AdminService, UserService, ProductService, ProfileService],
})
export class AdminModule {}
