import { Module } from "@nestjs/common";
import { SellerController } from "./seller.controller";
import { SellerService } from "./seller.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seller } from "./entities/seller.entity";
import { SellerProfile } from "./entities/seller-profile.entity";
import { Perfume } from "./entities/perfume.entity";

@Module({
    controllers: [SellerController],
    providers: [SellerService],
    imports: [TypeOrmModule.forFeature([Seller, SellerProfile, Perfume])],
})
export class SellerModule {}