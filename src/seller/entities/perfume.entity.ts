import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,} from 'typeorm';

import { Seller } from './seller.entity';

@Entity()
export class Perfume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Seller, (seller) => seller.perfumes)
  seller: Seller;
}
