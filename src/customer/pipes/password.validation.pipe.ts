import { PipeTransform, BadRequestException } from '@nestjs/common';

export class PasswordValidationPipe implements PipeTransform {
  transform(value: any) {
    const regex = /^(?=.*[a-z]).{6,}$/; 

    if (!value.password || !regex.test(value.password)) {
      throw new BadRequestException('Password must contain a lowercase letter');
    }

    return value;
  }
}
