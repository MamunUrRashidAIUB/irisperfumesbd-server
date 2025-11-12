export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;

  nidNumber?: string;
  // NID image must be uploaded via multipart/form-data as a file under the `nidImage` field
  // (Multer-style file object). The validation pipe checks the uploaded file size is <= 2 MB.
  nidImage?: any;
}
