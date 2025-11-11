export class CreateCustomerDto {
  name!: string;           
  email!: string;   
  phone!: string;       
  password!: string;      
  status?: string;       
  wishlist?: string[];    
  accountType?: string;  
}
