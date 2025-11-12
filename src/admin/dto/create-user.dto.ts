export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  nidNumber?: string;
  nidImage?: any;
}
