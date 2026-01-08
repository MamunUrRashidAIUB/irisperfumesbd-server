import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDeliveryDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

}
