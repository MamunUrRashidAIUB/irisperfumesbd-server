import { Controller, Post, Body, Patch, Param, Get, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 1. Create a user
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  // 2. Modify phone number of existing user
 @Patch(':id/phone')
updatePhone(@Param('id') id: string, @Body('phone') phone: string) {
  return this.userService.updatePhone(Number(id), phone);
  }

  // 3. Retrieve users with null fullName
  @Get('null-fullname')
  findNullFullName() {
    return this.userService.findUsersWithNullFullName();
  }

  // 4. Remove user by id
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}