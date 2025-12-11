import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { SellerService } from "./seller.service";
import { CreatePerfumeDto, CreateSellerDto, SellerRegistrationDto } from "./dto/create-seller.dto";
import { UpdatePerfumeDto } from "./dto/update-seller.dto";
import { UpdatePhoneDto } from "./dto/update-phone.dto";

@Controller('seller')
export class SellerController {
    constructor(private readonly sellerService: SellerService) {}

    @Post('register')
    registerSeller(@Body() sellerDto: SellerRegistrationDto) {
        return this.sellerService.registerSeller(sellerDto);
    }

    @Post('perfumes')
    create(@Body() createPerfumeDto: CreatePerfumeDto) {
        return this.sellerService.createPerfume(createPerfumeDto);
    }

    @Get('perfumes')
    findAll(@Query('brand') brand?: string) {
        return this.sellerService.findAllPerfumes(brand);
    }

    @Get('perfumes/:id')
    findOne(@Param('id') id: number) {
    return this.sellerService.findOnePerfume(id);
    }

    @Put('perfumes/:id')
    update(@Param('id') id: string, @Body() updatePerfumeDto: UpdatePerfumeDto) {
        return this.sellerService.updatePerfume(Number(id), updatePerfumeDto);
    }

    @Patch('perfumes/:id/stock')
    updateStock(@Param('id') id: string, @Body('quantity') quantity: number) {
        return this.sellerService.updateStock(Number(id), quantity);
    }

    @Delete('perfumes/:id')
    remove(@Param('id') id: string) {
        return this.sellerService.removePerfume(Number(id));
    }

    @Get('orders')
    getOrders(@Query('status') status?: string) {
        return this.sellerService.getOrders(status);
    }

    @Patch('orders/:id/status')
    updateOrderStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.sellerService.updateOrderStatus(Number(id), status);
    }

    @Post()
  createSeller(@Body() dto: CreateSellerDto) {
    return this.sellerService.createSeller(dto);
  }

  @Patch(':id/phone')
  updatePhone(
    @Param('id') id: string,
    @Body() UpdatePhoneDto: UpdatePhoneDto,
  ) {
    return this.sellerService.updatePhone(id, UpdatePhoneDto);
  }

  @Get('null-name')
  findNullNames() {
    return this.sellerService.findNullFullName();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.sellerService.deleteSeller(id);
  }



  //
  // Seller Profile Endpoints

  @Post(':id/profile')
  createOrUpdateProfile(@Param('id') sellerId: string, @Body() dto: any) {
    return this.sellerService.createOrUpdateProfile(sellerId, dto);
  }

  @Get(':id/profile')
  getProfile(@Param('id') sellerId: string) {
    return this.sellerService.getSellerProfile(sellerId);
  }

  @Delete(':id/profile')
  deleteProfile(@Param('id') sellerId: string) {
    return this.sellerService.deleteSellerProfile(sellerId);
  }


  
  //
  //Perfume Endpoints
  //

    @Post(':id/perfume')
  createPerfumes(@Param('id') sellerId: string, @Body() dto: any) {
    return this.sellerService.createPerfumes(sellerId, dto);
  }

  @Get(':id/perfumes')
  getPerfumes(@Param('id') sellerId: string) {
    return this.sellerService.getSellerPerfumes(sellerId);
  }

  @Delete(':sellerId/perfume/:perfumeId')
  deletePerfume(
    @Param('sellerId') sellerId: string,
    @Param('perfumeId') perfumeId: number,
  ) {
    return this.sellerService.deletePerfume(sellerId, perfumeId);
  }

}