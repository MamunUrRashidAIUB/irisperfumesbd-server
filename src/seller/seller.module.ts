import { Module } from "@nestjs/common";
import { SellerController } from "./seller.controller";
import { SellerService } from "./seller.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seller } from "./entities/seller.entity";

@Module({
    controllers: [SellerController],
    providers: [SellerService],
    imports: [TypeOrmModule.forFeature([Seller])],
})
export class SellerModule {}