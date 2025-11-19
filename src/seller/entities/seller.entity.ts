import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';

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
}
