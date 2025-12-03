import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Admin } from './admin.entity';

@Entity()
export class AdminProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToOne(() => Admin, admin => admin.profile)
  @JoinColumn()
  admin: Admin;
}
