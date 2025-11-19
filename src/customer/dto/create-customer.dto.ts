export class CreateCustomerDto {
  name!: string;           
  email!: string;   
  phone!: string;       
  password!: string; 
  file?: Express.Multer.File;   
  // status?: string;       
  // wishlist?: string[];    
  // accountType?: string;  
}
