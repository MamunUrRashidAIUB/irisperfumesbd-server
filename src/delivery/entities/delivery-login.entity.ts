import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Delivery } from './delivery.entity';

@Entity('delivery_login')
export class DeliveryLogin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Delivery, delivery => delivery.login, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  delivery: Delivery;
}
