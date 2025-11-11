import { PipeTransform, BadRequestException } from '@nestjs/common';

export class PasswordValidationPipe implements PipeTransform {
  transform(value: any) {
    if (value.password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters');
    }

    if (!/[a-z]/.test(value.password)) {
      throw new BadRequestException('Password must contain a lowercase letter');
    }

    return value;
  }
}
