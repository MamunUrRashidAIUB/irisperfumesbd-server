import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/createDelivery.dto';

@Injectable()
export class DeliveryService {
  private deliveries: any[] = [];
  private idCounter = 1;

  create(dto: CreateDeliveryDto) {
    const newDelivery = {
      id: this.idCounter++,
      ...dto,
      status: 'pending',
      createdAt: new Date(),
    };
    this.deliveries.push(newDelivery);
    return { message: 'Delivery created successfully', data: newDelivery };
  }

  findAll() {
    return { message: 'All deliveries', data: this.deliveries };
  }

  findOne(id: number) {
    const delivery = this.deliveries.find((d) => d.id === id);
    if (!delivery) return { message: 'Delivery not found' };
    return { message: 'Delivery found', data: delivery };
  }

  assignDeliveryPerson(id: number, deliveryPerson: string) {
    const delivery = this.deliveries.find((d) => d.id === id);
    if (!delivery) return { message: 'Delivery not found' };
    delivery.deliveryPerson = deliveryPerson;
    delivery.status = 'assigned';
    return { message: 'Delivery person assigned', data: delivery };
  }

  updateStatus(id: number, status: string) {
    const delivery = this.deliveries.find((d) => d.id === id);
    if (!delivery) return { message: 'Delivery not found' };
    delivery.status = status;
    return { message: 'Delivery status updated', data: delivery };
  }

  updateLocation(id: number, location: string) {
    const delivery = this.deliveries.find((d) => d.id === id);
    if (!delivery) return { message: 'Delivery not found' };
    delivery.currentLocation = location;
    return { message: 'Delivery location updated', data: delivery };
  }

  findByCustomer(customerId: number) {
    const customerDeliveries = this.deliveries.filter(
      (d) => d.customerId === customerId,
    );
    return { message: 'Deliveries for customer', data: customerDeliveries };
  }

  remove(id: number) {
    const index = this.deliveries.findIndex((d) => d.id === id);
    if (index === -1) return { message: 'Delivery not found' };
    const deleted = this.deliveries.splice(index, 1);
    return { message: 'Delivery deleted', data: deleted };
  }

  filterByStatus(status: string) {
  if (!status) {
    return { message: 'Please provide a status value in the query, e.g., /delivery/filter?status=pending' };
  }
  const filtered = this.deliveries.filter((d) => d.status === status);
  return { message: `Deliveries with status '${status}'`, data: filtered };
}

}
