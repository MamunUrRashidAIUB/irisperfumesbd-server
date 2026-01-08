import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryLogin } from '../delivery/entities/delivery-login.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(DeliveryLogin)
    private loginRepo: Repository<DeliveryLogin>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.loginRepo.findOne({
      where: { email },
      relations: ['delivery'],
    });

    if (!user) return null;

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return null;

    return user;
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.delivery.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      deliveryId: user.delivery.id,
    };
  }
}
