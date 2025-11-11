export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  // National ID number (digits only). Validated by the admin validation pipe.
  nidNumber?: string;
  // NID image. When uploaded via multipart it will be available on the request as a File object
  // or it may be sent as a base64 data URI string in the body. The pipe checks size <= 2MB.
  nidImage?: any;
}
