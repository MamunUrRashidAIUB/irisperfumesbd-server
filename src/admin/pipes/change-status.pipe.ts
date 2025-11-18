import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ChangeStatusPipe implements PipeTransform {
  transform(value: any) {
    const allowed = ['active', 'inactive'];
    if (typeof value !== 'string' || !allowed.includes(value)) {
      throw new BadRequestException("status must be 'active' or 'inactive'");
    }
    return value as 'active' | 'inactive';
  }
}
