import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CreateUserCategory1Dto } from '../dto/create-user-category1.dto';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: CreateUserCategory1Dto) {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Invalid payload');
    }

    const { fullName, age, status } = value as any;

    // Validate fullName
    if (typeof fullName !== 'string' || fullName.trim() === '') {
      throw new BadRequestException('fullName is required');
    }
    if (fullName.length > 100) {
      throw new BadRequestException('fullName must be at most 100 characters');
    }

    // Validate age (allow strings that can be parsed)
    const parsedAge = Number(age);
    if (!Number.isInteger(parsedAge) || parsedAge < 0) {
      throw new BadRequestException('age must be an unsigned integer');
    }

    // Validate status and set default
    const allowed = ['active', 'inactive'];
    const finalStatus = status === undefined || status === null ? 'active' : String(status);
    if (!allowed.includes(finalStatus)) {
      throw new BadRequestException("status must be 'active' or 'inactive'");
    }

    const dto: CreateUserCategory1Dto = {
      fullName: fullName.trim(),
      age: parsedAge,
      status: finalStatus as 'active' | 'inactive',
    };

    return dto;
  }
}
