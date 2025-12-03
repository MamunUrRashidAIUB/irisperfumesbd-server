import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminProfile } from './entity/admin-profile.entity';
import { Admin } from './entity/admin.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(AdminProfile)
    private readonly profileRepo: Repository<AdminProfile>,
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async createForAdmin(adminId: number, payload: Partial<AdminProfile>) {
    const admin = await this.adminRepo.findOneBy({ id: adminId });
    if (!admin) throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);

    const existing = await this.profileRepo.findOne({ where: { admin: { id: adminId } } as any });
    if (existing) throw new HttpException('Profile already exists', HttpStatus.BAD_REQUEST);

    const profile = this.profileRepo.create({ ...payload, admin } as any);
    const saved = await this.profileRepo.save(profile);
    return { message: 'Profile created', data: saved };
  }

  async getByAdmin(adminId: number) {
    const profile = await this.profileRepo.findOne({ where: { admin: { id: adminId } } as any, relations: ['admin'] });
    if (!profile) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    return profile;
  }

  async updateForAdmin(adminId: number, payload: Partial<AdminProfile>) {
    const profile = await this.profileRepo.findOne({ where: { admin: { id: adminId } } as any });
    if (!profile) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    Object.assign(profile, payload);
    const saved = await this.profileRepo.save(profile);
    return { message: 'Profile updated', data: saved };
  }

  async removeForAdmin(adminId: number) {
    const profile = await this.profileRepo.findOne({ where: { admin: { id: adminId } } as any });
    if (!profile) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    await this.profileRepo.remove(profile);
    return { message: 'Profile removed' };
  }
}
