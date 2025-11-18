import { Controller, Post, Body, Patch, Param, Get, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserCategory1Dto } from './dto/create-user-category1.dto';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { ChangeStatusPipe } from './pipes/change-status.pipe';

@Controller('admins/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a user
  @Post()
  async create(@Body(new CreateUserPipe()) dto: CreateUserCategory1Dto) {
    return this.userService.create(dto);
  }

  // Change status of a user to 'active' or 'inactive'
  @Patch(':id/status')
  async changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', new ChangeStatusPipe()) status: 'active' | 'inactive',
  ) {
    if (!Number.isInteger(id) || id < 1) return { message: 'Invalid id' };
    return this.userService.changeStatus(id, status);
  }

  // Retrieve list of users with 'inactive' status
  @Get('inactive')
  async getInactive() {
    return this.userService.findInactive();
  }

  // Get list of users older than 40
  @Get('older-than/40')
  async olderThanForty() {
    return this.userService.findOlderThan(40);
  }

  // Optional: parameterized endpoint for other ages
  @Get('older-than/:age')
  async olderThanParam(@Param('age', ParseIntPipe) age: number) {
    if (!Number.isFinite(age)) return { users: [] };
    return this.userService.findOlderThan(age);
  }
}
