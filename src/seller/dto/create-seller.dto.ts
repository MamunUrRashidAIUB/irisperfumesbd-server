import { IsEmail, IsNotEmpty, Matches, MinLength, IsIn, IsNumberString, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePerfumeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  description: string;
}


export class SellerRegistrationDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/@aiub\.edu$/, { message: 'Email must be from aiub.edu domain' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  password: string;

  @IsIn(['male', 'female'], { message: 'Gender must be either male or female' })
  gender: string;

  @IsNumberString({}, { message: 'Phone number must contain only digits' })
  phone: string;
}

export class CreateSellerDto {
  @IsOptional()
  
  @IsString()
  fullName?: string;

  @IsNumber()
  phone: number;
}