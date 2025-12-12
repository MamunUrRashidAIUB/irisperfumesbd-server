import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDeliveryDbDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  socialMediaLink?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  country?: string;
}
