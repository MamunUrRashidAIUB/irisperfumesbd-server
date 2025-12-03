import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { AdminProfile } from './admin-profile.entity';
import { Product } from './product.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  role?: string;

  @Column({ type: 'varchar', length: 16, default: 'active' })
  status?: string;

  @OneToOne(() => AdminProfile, profile => profile.admin)
  profile: AdminProfile;

  @OneToMany(() => Product, product => product.admin)
  products: Product[];
}
