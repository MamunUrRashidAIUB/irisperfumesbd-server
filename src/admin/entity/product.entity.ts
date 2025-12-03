import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Admin } from './admin.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @ManyToOne(() => Admin, admin => admin.products)
  admin: Admin;
}
