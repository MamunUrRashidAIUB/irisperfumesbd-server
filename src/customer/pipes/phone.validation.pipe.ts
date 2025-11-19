import { PipeTransform, BadRequestException } from '@nestjs/common';

export class PhoneValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value.phone||!value.phone.startsWith('01')) {
      throw new BadRequestException('Phone number must start with 01');
    }

    return value;
  }
}
