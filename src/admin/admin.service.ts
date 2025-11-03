import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AdminService {
  // Service methods would go here
  admins = [];

  create(CreateUserDto: CreateUserDto) {
    const admin = { id: Date.now(), ...CreateUserDto };
    this.admins.push(admin);
    return { message: 'Admin created successfully', data: admin };
  }
}
