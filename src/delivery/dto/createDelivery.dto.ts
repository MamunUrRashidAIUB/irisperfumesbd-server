import { IsNotEmpty, Matches, IsDateString, IsUrl, } from 'class-validator';

export class CreateDeliveryDto {
  orderId: number;
  customerId: number;
  address: string;
  contactNumber: string;

  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name must not contain numbers' })
  name: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/[@#$&]/, { message: 'Password must contain a special character' })
  password: string;

  @IsNotEmpty({ message: 'Date is required' })
  @IsDateString({}, { message: 'Date must be valid (YYYY-MM-DD)'})
  date: string;

  @IsNotEmpty({ message: 'Social media link is required'})
  @IsUrl({}, {message: 'Social media link must be a valid URL'})
  socialMediaLink: string;
}
