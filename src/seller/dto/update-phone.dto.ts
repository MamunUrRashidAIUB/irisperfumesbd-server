import { IsNumber } from 'class-validator';

export class UpdatePhoneDto {
  @IsNumber()
  phone: number;
}
