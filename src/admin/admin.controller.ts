import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UseInterceptors, UploadedFile, UseGuards, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminValidationPipe } from './admin-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService, private readonly authService: AuthService) {}

  @Post()
  @UseInterceptors(FileInterceptor('nidImage'))
  async create(
    @UploadedFile() nidImage: any,
    @Body() createAdminDto: CreateAdminDto,
  ) {
    // merge uploaded file into the body so validation can see it
    const payload = { ...createAdminDto, nidImage } as any;

    // run the validation pipe manually so it receives the merged payload
    const pipe = new AdminValidationPipe();
    await pipe.transform(payload);

    return this.adminService.create(payload);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    const admin = await this.authService.validateAdmin(email, password);
    if (!admin || admin.role !== 'admin') {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(admin);
  }

  @Get()
  findAll(@Query('role') role?: string) {
    return this.adminService.findAll(role);
  }
   @Get('search')
  searchAdmin(@Query('name') name: string) {
    return this.adminService.searchByName(name);
  }
 

  @Get(':id')
  async findOne(@Param('id') id: string) {
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
