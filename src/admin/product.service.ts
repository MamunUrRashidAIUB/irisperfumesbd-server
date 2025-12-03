import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { Admin } from './entity/admin.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async createForAdmin(adminId: number, payload: Partial<Product>) {
    const admin = await this.adminRepo.findOneBy({ id: adminId });
    if (!admin) throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    const p = this.repo.create({ ...payload, admin } as any);
    const saved = await this.repo.save(p);
    return { message: 'Product created', data: saved };
  }

  async findByAdmin(adminId: number) {
    const products = await this.repo.find({ where: { admin: { id: adminId } }, relations: ['admin'] });
    return { products };
  }

  async remove(id: number) {
    const p = await this.repo.findOneBy({ id });
    if (!p) throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    await this.repo.remove(p);
    return { message: 'Product removed', id };
  }
}
