import { CreatePerfumeDto, CreateSellerDto, SellerRegistrationDto } from './dto/create-seller.dto';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePerfumeDto } from './dto/update-seller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { IsNull, Repository } from 'typeorm';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Perfume } from './entities/perfume.entity';
import { SellerProfile } from './entities/seller-profile.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SellerService {

  //hash password
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
     // Register seller (hashing + http exception)
  async registerSeller(sellerDto: SellerRegistrationDto) {
    const exists = await this.repo.findOne({
      where: {email: sellerDto.email },
    });

    if (exists) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashed = await this.hashPassword(sellerDto.password);

    const seller = this.repo.create({
      ...sellerDto,
      password: hashed,
    });

    return this.repo.save(seller);
  }


    private perfumes: any[] = [];
    private orders: any[] = [];
    private perfumeId = 1;



    createPerfume(createPerfumeDto: CreatePerfumeDto) {
        const newPerfume = { id: this.perfumeId++, ...createPerfumeDto };
        this.perfumes.push(newPerfume);
        return { success: true, message: 'perfume added successfully', data: newPerfume };
}

async loginSeller(email: string, password: string) {
  const seller = await this.repo.findOne({ where: { email } });
  if (!seller) {
    throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
  }

  const isPasswordValid = await bcrypt.compare(password, seller.password);
  if (!isPasswordValid) {
    throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
  }

  // If you want a token, generate it here using JwtService
  // For now, just return seller info
  return { message: 'Login successful', sellerId: seller.id };
}

findAllPerfumes(brand?: string) {
    const result = brand
        ? this.perfumes.filter(p => p.brand === brand)
        : this.perfumes;
    return { success: true, data: result };

}

findOnePerfume(id: number) {
    const perfume = this.perfumes.find(p => p.id === id);
    return perfume
        ? { success: true, data: perfume }
        : { success: false, message: 'Perfume not found' };
}

updatePerfume(id: number, updatePerfumeDto: UpdatePerfumeDto) {
    const index = this.perfumes.findIndex(p => p.id === id);
    if (index === -1) return { success: false, message: 'Perfume not found' };
    this.perfumes[index] = { ...this.perfumes[index], ...updatePerfumeDto };
    return { success: true, message: 'Perfume updated successfully', data: this.perfumes[index] };
}

updateStock(id: number, quantity: number) {
    const perfume = this.perfumes.find(p => p.id === id);
    if (!perfume) return { success: false, message: 'Perfume not found' };
    perfume.quantity = quantity;
    return { success: true, message: 'Stock updated successfully', data: perfume };
  }

  removePerfume(id: number) {
    const index = this.perfumes.findIndex(p => p.id === id);
    if (index === -1) return { success: false, message: 'Perfume not found' };
    this.perfumes.splice(index, 1);
    return { success: true, message: 'Perfume deleted successfully' };
  }

  getOrders(status?: string) {
    const result = status
      ? this.orders.filter(o => o.status === status)
      : this.orders;
    return { success: true, data: result };
  }

  updateOrderStatus(id: number, status: string) {
    const order = this.orders.find(o => o.id === id);
    if (!order) return { success: false, message: 'Order not found' };
    order.status = status;
    return { success: true, message: 'Order status updated', data: order };
  }

   constructor(
    @InjectRepository(Seller) private repo: Repository<Seller>,
    @InjectRepository(SellerProfile) private profileRepo: Repository<SellerProfile>,
    @InjectRepository(Perfume) private perfumeRepo: Repository<Perfume>,
  ) {}

  


  // 1. Create Seller
  createSeller(dto: CreateSellerDto) {
    const seller = this.repo.create(dto);
    return this.repo.save(seller);
  }

  // 2. Update Seller Phone
  async updatePhone(id: string, dto: UpdatePhoneDto) {
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id } });
  }

  // 3. Find sellers with fullName = NULL
  findNullFullName() {
    return this.repo.find({
      where: { fullName: IsNull() },
    });
  }

  // 4. Delete a seller
  deleteSeller(id: string) {
    return this.repo.delete(id);
  }



  //
  // One to One relation: Seller Profile

async createOrUpdateProfile(sellerId: string, dto: any) {
    const seller = await this.repo.findOne({ where: { id: sellerId } });

    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    let profile = await this.profileRepo.findOne({
      where: { seller: { id: sellerId } },
    });

    if (profile) {
      // update existing
      profile.address = dto.address;
      profile.city = dto.city;
    } else {
      // create new
      profile = this.profileRepo.create({
        address: dto.address,
        city: dto.city,
        seller: seller,
      });
    }

    return this.profileRepo.save(profile);
  }

  getSellerProfile(sellerId: string) {
    return this.profileRepo.findOne({
      where: { seller: { id: sellerId } },
      relations: ['seller'],
    });
  }

  async deleteSellerProfile(sellerId: string) {
    const profile = await this.profileRepo.findOne({
      where: { seller: { id: sellerId } },
    });

    if (!profile) throw new NotFoundException('Profile not found');

    return this.profileRepo.remove(profile);
  }
  


  //
  // One to Many relation: Perfumes

   async createPerfumes(sellerId: string, dto: any) {
    const seller = await this.repo.findOne({ where: { id: sellerId } });

    if (!seller) throw new NotFoundException('Seller not found');

    const perfume = this.perfumeRepo.create({
      name: dto.name,
      seller: seller,
    });

    return this.perfumeRepo.save(perfume);
  }

  getSellerPerfumes(sellerId: string) {
    return this.perfumeRepo.find({
      where: { seller: { id: sellerId } },
    });
  }

  async deletePerfume(sellerId: string, perfumeId: number) {
    const perfume = await this.perfumeRepo.findOne({
      where: { id: perfumeId, seller: { id: sellerId } },
    });

    if (!perfume) throw new NotFoundException('Perfume not found');

    return this.perfumeRepo.remove(perfume);
  }


}