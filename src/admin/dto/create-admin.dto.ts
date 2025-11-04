export class CreateAdminDto {
  name: string;
  email: string;
  password: string;
  role?: string;
  permissions?: string[];
  status?: string;
}
