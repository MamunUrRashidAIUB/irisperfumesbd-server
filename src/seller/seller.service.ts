import { CreatePerfumeDto, CreateSellerDto, SellerRegistrationDto } from './dto/create-seller.dto';
import { Injectable } from '@nestjs/common';
import { UpdatePerfumeDto } from './dto/update-seller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { IsNull, Repository } from 'typeorm';
import { UpdatePhoneDto } from './dto/update-phone.dto';
@Injectable()
export class SellerService {
    registerSeller(sellerDto: SellerRegistrationDto) {
        return {
            success: true,
            message: 'Seller registered successfully',
            data: sellerDto,
        };
    }
    private perfumes: any[] = [];
    private orders: any[] = [];
    private perfumeId = 1;

    createPerfume(createPerfumeDto: CreatePerfumeDto) {
        const newPerfume = { id: this.perfumeId++, ...createPerfumeDto };
        this.perfumes.push(newPerfume);
        return { success: true, message: 'perfume added successfully', data: newPerfume };
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
}