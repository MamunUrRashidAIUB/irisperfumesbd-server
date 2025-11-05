import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll(@Query('role') role?: string) {
    return this.adminService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    return this.adminService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: CreateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() partialAdminDto: Partial<CreateAdminDto>,
  ) {
    return this.adminService.partialUpdate(id, partialAdminDto);
  }
@Get('search')
searchAdmin(@Query('name') name: string) {
  return this.adminService.searchByName(name);
}



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }

  @Get(':id/permissions')
  getPermissions(@Param('id') id: string) {
    return this.adminService.getPermissions(id);
  }

  @Post(':id/assign-role')
  assignRole(@Param('id') id: string, @Body('role') role: string) {
    return this.adminService.assignRole(id, role);
  }
}
