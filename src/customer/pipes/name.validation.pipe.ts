import { PipeTransform, BadRequestException } from '@nestjs/common';

export class NameValidationPipe implements PipeTransform {
  transform(value: any) {
    const regex = /^[A-Za-z ]+$/;

    if (!regex.test(value.name)) {
      throw new BadRequestException('Name must not contain special characters');
    }

    return value;
  }
}
