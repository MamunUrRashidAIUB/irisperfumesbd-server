import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entity/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly repo: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const existing = await this.repo.findOneBy({ email: createAdminDto.email });
    if (existing) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    const hashed = await bcrypt.hash(createAdminDto.password || '', 10);
    const admin = this.repo.create({
      name: createAdminDto.name,
      email: createAdminDto.email,
      password: hashed,
      role: createAdminDto.role,
      status: createAdminDto.status,
      nidNumber: createAdminDto.nidNumber,
    } as any);
    const saved = await this.repo.save(admin);
    return { message: 'Admin created', data: saved };
  }

  async findAll(role?: string) {
    if (role) {
      const admins = await this.repo.find({ where: { role } });
      return { admins };
    }
    const admins = await this.repo.find();
    return { admins };
  }

  async findOne(id: string) {
    const n = Number(id);
    if (!Number.isInteger(n)) return { message: 'Invalid id' };
    const admin = await this.repo.findOne({ where: { id: n } });
    if (!admin) throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    return admin;
  }

  async update(id: string, updateAdminDto: CreateAdminDto) {
    const n = Number(id);
    const admin = await this.repo.findOneBy({ id: n });
    if (!admin) throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    Object.assign(admin, updateAdminDto);
    const saved = await this.repo.save(admin);
    return { message: 'Admin updated', data: saved };
  }

  async partialUpdate(id: string, partialAdminDto: Partial<CreateAdminDto>) {
    const n = Number(id);
    const admin = await this.repo.findOneBy({ id: n });
    if (!admin) throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    Object.assign(admin, partialAdminDto);
    const saved = await this.repo.save(admin);
    return { message: 'Admin partially updated', data: saved };
  }

  async remove(id: string) {
    const n = Number(id);
    const admin = await this.repo.findOneBy({ id: n });
    if (!admin) throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    await this.repo.remove(admin);
    return { message: `Admin ${id} removed` };
  }

  async searchByName(name?: string) {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return { names: [] };
    }
    const q = name.toLowerCase();
    const results = await this.repo
      .createQueryBuilder('a')
      .where('LOWER(a.name) LIKE :q', { q: `%${q}%` })
      .getMany();
    return { names: results.map((r) => r.name) };
  }

  async getPermissions(id: string) {
    const n = Number(id);
    const admin = await this.repo.findOneBy({ id: n });
    if (!admin) throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    return { id, permissions: ['read', 'write'] };
  }

  async assignRole(id: string, role: string) {
    const n = Number(id);
    const admin = await this.repo.findOneBy({ id: n });
    if (!admin) throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    admin.role = role;
    await this.repo.save(admin);
    return { message: 'Role assigned', id, role };
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
}
