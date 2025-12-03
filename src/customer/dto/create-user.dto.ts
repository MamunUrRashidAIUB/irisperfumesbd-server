import { IsOptional, IsString, IsBoolean, Matches, IsNumberString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string;  // Nullable column

  @Matches(/^01[0-9]{8,9}$/, {
    message: 'Phone number must start with 01 and be valid',
  })

  @IsString()
  phone!: string; 
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true; 
}