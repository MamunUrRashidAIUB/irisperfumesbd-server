import { Controller, Post, Param, Body, Get, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('admins/:adminId/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param('adminId', ParseIntPipe) adminId: number,
    @Body() body: any,
  ) {
    return this.productService.createForAdmin(adminId, body);
  }

  @Get()
  async list(@Param('adminId', ParseIntPipe) adminId: number) {
    return this.productService.findByAdmin(adminId);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
