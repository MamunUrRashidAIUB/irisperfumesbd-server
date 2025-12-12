import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Delivery } from './delivery.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  orderRef: string;

  @Column({ length: 300 })
  address: string;

  @Column({ length: 20, nullable: true })
  contactNumber: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Delivery, (delivery) => delivery.orders, { onDelete: 'SET NULL' })
  delivery: Delivery;
}
