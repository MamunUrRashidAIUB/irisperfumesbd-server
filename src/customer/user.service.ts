import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { IsNull } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(dto: CreateUserDto): Promise<User> {
  //    if (!dto.phone) {
  //   throw new BadRequestException('Phone number is required');
  // }
  
    console.log("DTO Received:", dto);

    const user = this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  // Update the phone number of an existing user
  async updatePhone(id: number, phone: string): Promise<User> {
  const user = await this.userRepository.findOne({ where: { id } });
  if (!user) throw new NotFoundException(`User with id ${id} not found`);
  user.phone = phone; 
  return await this.userRepository.save(user);
  }

  // Retrieve users with null fullName
  async findUsersWithNullFullName(): Promise<User[]> {
    return await this.userRepository.find({ where: { fullName: IsNull() } });
  }

  // Remove a user by id
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`User with id ${id} not found`);
    return { message: `User ${id} removed successfully` };
  }

  // Optional: Get a user by id
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }
}
