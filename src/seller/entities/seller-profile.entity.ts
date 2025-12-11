import {Entity,Column,PrimaryGeneratedColumn,OneToOne,JoinColumn,} from 'typeorm';

import { Seller } from './seller.entity';

@Entity()
export class SellerProfile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @OneToOne(() => Seller, (seller) => seller.profile)
  @JoinColumn()
  seller: Seller;
}
