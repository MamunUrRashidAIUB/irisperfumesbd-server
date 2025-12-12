import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Delivery } from './entities/delivery.entity';
import { Order } from './entities/order.entity';
import { DeliveryLogin } from './entities/delivery-login.entity';
import { CreateDeliveryDbDto } from './dto/createDeliveryDb.dto';
import { CreateOrderDto } from './dto/order.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRepo: Repository<Delivery>,

    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(DeliveryLogin)
    private loginRepo: Repository<DeliveryLogin>,
  ) {}

  async create(dto: CreateDeliveryDbDto) {
    const delivery = this.deliveryRepo.create(dto);
    const saved = await this.deliveryRepo.save(delivery);
    return { message: 'Delivery created successfully', data: { id: saved.id } };
  }

  async findAll() {
    const list = await this.deliveryRepo.find();
    return { message: 'All deliveries', data: list };
  }

  async findOne(id: number) {
    const d = await this.deliveryRepo.findOne({ where: { id }, relations: ['orders', 'login'] });
    if (!d) throw new NotFoundException('Delivery not found');
    return { message: 'Delivery found', data: d };
  }

  async updateFull(id: number, dto: CreateDeliveryDbDto) {
    const delivery = await this.deliveryRepo.preload({ id, ...dto });
    if (!delivery) throw new NotFoundException('Delivery not found');
    const saved = await this.deliveryRepo.save(delivery);
    return { message: 'Delivery updated', data: saved };
  }

  async updateCountry(id: number, country: string) {
    const res = await this.deliveryRepo.update(id, { country });
    if (res.affected === 0) throw new NotFoundException('Delivery not found');
    return { message: 'Country updated successfully', data: { id, country } };
  }

  async remove(id: number) {
    const res = await this.deliveryRepo.delete(id);
    if (res.affected === 0) throw new NotFoundException('Delivery not found');
    return { message: 'Delivery deleted', data: { id } };
  }

  async findByDate(date: string) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    const results = await this.deliveryRepo.find({
      where: { joiningDate: Between(start, end) },
    });
    return { message: `Deliveries on ${date}`, data: results };
  }

  async findUnknownCountry() {
    const results = await this.deliveryRepo.find({ where: { country: 'Unknown' } });
    return { message: 'Unknown country deliveries', data: results };
  }


  async createOrder(deliveryId: number, dto: CreateOrderDto) {
    const delivery = await this.deliveryRepo.findOne({ where: { id: deliveryId } });
    if (!delivery) throw new NotFoundException('Delivery not found');

    const order = this.orderRepo.create({ ...dto, delivery });
    const saved = await this.orderRepo.save(order);
    return { message: 'Order created', data: saved };
  }

  async getOrdersForDelivery(deliveryId: number) {
    const orders = await this.orderRepo.find({
      where: { delivery: { id: deliveryId } },
      relations: ['delivery'],
    });
    return { message: `Orders for delivery ${deliveryId}`, data: orders };
  }

  async deleteOrder(orderId: number) {
    const res = await this.orderRepo.delete(orderId);
    if (res.affected === 0) throw new NotFoundException('Order not found');
    return { message: 'Order deleted', data: { orderId } };
  }

  async createLoginForDelivery(deliveryId: number, email: string, password: string) {
  const delivery = await this.deliveryRepo.findOne({ where: { id: deliveryId } });
  if (!delivery) throw new NotFoundException('Delivery not found');

  const existing = await this.loginRepo.findOne({ where: { email } });
  if (existing) {
    throw new Error('Email already registered');
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const login = this.loginRepo.create({ email, password: hashed, delivery });
  const saved = await this.loginRepo.save(login);
  return { message: 'Login created', data: { id: saved.id, deliveryId: delivery.id } };
}

async getLoginByDelivery(deliveryId: number) {
  const login = await this.loginRepo.findOne({
    where: { delivery: { id: deliveryId } },
    relations: ['delivery'],
  });

  if (!login) throw new NotFoundException('Login not found');

  return { message: 'Login found', data: login };
}

async getOrderWithDelivery(orderId: number) {
  const order = await this.orderRepo.findOne({
    where: { id: orderId },
    relations: ['delivery'],
  });

  if (!order) throw new NotFoundException('Order not found');

  return {
    message: 'Order with delivery fetched',
    data: order,
  };
}
}
