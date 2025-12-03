import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {

  private customers: any[] = [];
  private nextId = 1;

  // Customer creates an account
  create(dto: CreateCustomerDto & { file?: Express.Multer.File }) {
    const customer = { id: (this.nextId++).toString(), ...dto };
    this.customers.push(customer);
     const customerSafe = { ...customer, file: customer.file?.originalname };
    return { message: 'Account created', data: customerSafe };
  }

  // Customer views their own profile
  findOne(id: string) {
    const customer = this.customers.find(c => c.id === id);
    return customer || { message: 'Customer not found' };
  }

  // Customer updates their own profile
   /* updateMe(id: string, dto: Partial<CreateCustomerDto>) {
    const customer = this.customers.find(c => c.id === id);
    if (!customer) return { message: 'Customer not found' };
    Object.assign(customer, dto);
    return { message: 'Profile updated', data: customer };
  } */

   update(id: string, updateCustomerDto: CreateCustomerDto) {
    const customer = this.customers.find(c => c.id === id);
    if (!customer) return { message: 'Customer not found' };
    Object.assign(customer, updateCustomerDto);
    return { message: 'Customer updated', data: customer };
  }

  partialUpdate(id: string, partialCustomerDto: Partial<CreateCustomerDto>) {
    const customer = this.customers.find(c => c.id === id);
    if (!customer) return { message: 'Customer not found' };
    Object.assign(customer, partialCustomerDto);
    return { message: 'Customer partially updated', data: customer };
  }
  
  remove(id: string) {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) return { message: 'Customer not found' };
    this.customers.splice(index, 1);
    return { message: `Customer ${id} removed` };
  }

  getOrders(id: string) {
    const customer = this.customers.find(c => c.id === id);
    if (!customer) return { message: 'Customer not found' };
    return { id, orders: [{ orderId: '101', product: 'Laptop', amount: 1200 }] };
  }

  // Customer views their own orders
  myOrders(id: string) {
    return {
      id,
      orders: [
        { orderId: '101', product: 'Laptop', amount: 1200 },
        { orderId: '102', product: 'Headphones', amount: 200 }
      ]
    };
  }

  // Customer wishlist
  addToWishlist(id: string, productId: string) {
    const customer = this.customers.find(c => c.id === id);
    if (!customer) return { message: 'Customer not found' };
    customer.wishlist ??= [];
    customer.wishlist.push(productId);
    return { message: 'Added to wishlist', data: customer };
  }
}