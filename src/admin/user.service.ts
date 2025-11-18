import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserCategory1Dto } from './dto/create-user-category1.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(dto: CreateUserCategory1Dto) {
    const user = this.repo.create({
      fullName: dto.fullName,
      age: dto.age,
      status: dto.status ?? 'active',
    });
    const saved = await this.repo.save(user);
    return { message: 'User created', data: saved };
  }

  async changeStatus(id: number, status: 'active' | 'inactive') {
    const user = await this.repo.findOneBy({ id });
    if (!user) return { message: 'User not found' };
    user.status = status;
    const saved = await this.repo.save(user);
    return { message: 'Status updated', data: saved };
  }

  async findInactive() {
    const users = await this.repo.find({ where: { status: 'inactive' } });
    return { users };
  }

  async findOlderThan(age: number) {
    const users = await this.repo.createQueryBuilder('u')
      .where('u.age > :age', { age })
      .getMany();
    return { users };
  }

  async findByIdString(id: string) {
    const n = Number(id);
    if (!Number.isInteger(n) || n < 1) return null;
    return this.repo.findOneBy({ id: n });
  }
}
