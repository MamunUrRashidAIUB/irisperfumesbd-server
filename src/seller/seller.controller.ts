import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { SellerService } from "./seller.service";
import { CreatePerfumeDto } from "./dto/create-seller.dto";
import { UpdatePerfumeDto } from "./dto/update-seller.dto";

@Controller('seller')
export class SellerController {
    constructor(private readonly sellerService: SellerService) {}

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
    update(@Param('id') id: number, @Body() updatePerfumeDto: UpdatePerfumeDto) {
        return this.sellerService.updatePerfume(id, updatePerfumeDto);
    }

    @Patch('perfumes/:id/stock')
    updateStock(@Param('id') id: number, @Body('quantity') quantity: number) {
        return this.sellerService.updateStock(id, quantity);
    }

    @Delete('perfumes/:id')
    remove(@Param('id') id: number) {
        return this.sellerService.removePerfume(id);
    }

    @Get('orders')
    getOrders(@Query('status') status?: string) {
        return this.sellerService.getOrders(status);
    }

    @Patch('orders/:id/status')
    updateOrderStatus(@Param('id') id: number, @Body('status') status: string) {
        return this.sellerService.updateOrderStatus(id, status);
    }

}