import { Controller, Post, Get, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admins/:adminId/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param('adminId', ParseIntPipe) adminId: number,
    @Body() body: any,
  ) {
    return this.profileService.createForAdmin(adminId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@Param('adminId', ParseIntPipe) adminId: number) {
    return this.profileService.getByAdmin(adminId);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Param('adminId', ParseIntPipe) adminId: number, @Body() body: any) {
    return this.profileService.updateForAdmin(adminId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@Param('adminId', ParseIntPipe) adminId: number) {
    return this.profileService.removeForAdmin(adminId);
  }
}
