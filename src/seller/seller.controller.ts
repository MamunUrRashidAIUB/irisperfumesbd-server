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
    findOne(@Param('id') id: string) {
        return this.sellerService.findOnePerfume(Number(id));
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

}