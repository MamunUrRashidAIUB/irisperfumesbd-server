import { Entity, Column, PrimaryColumn, BeforeInsert, OneToOne, OneToMany } from 'typeorm';
import { Perfume } from './perfume.entity';
import { SellerProfile } from './seller-profile.entity';

@Entity()
export class Seller {

  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = 'SELL-' + Math.floor(Math.random() * 90000 + 10000);
  }

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'varchar', nullable: true })
  fullName: string;

  @Column({ type: 'bigint', unsigned: true })
  phone: number;

  @OneToOne(() => SellerProfile, (profile) => profile.seller)
  profile: SellerProfile;

  @OneToMany(() => Perfume, (perfume) => perfume.seller)
  perfumes: Perfume[];
}
