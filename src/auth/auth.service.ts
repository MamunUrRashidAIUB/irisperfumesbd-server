import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../admin/entity/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async validateAdmin(email: string, pass: string) {
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) return null;
    const match = await bcrypt.compare(pass, admin.password || '');
    if (!match) return null;
    return admin;
  }

  async login(admin: any) {
    const payload = { email: admin.email, sub: admin.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
