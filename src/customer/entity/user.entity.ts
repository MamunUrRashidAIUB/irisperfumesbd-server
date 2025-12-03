import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'varchar', nullable: true })
  fullName!: string | null;

  @Column({ type: 'varchar', length: 11 }) 
  phone!: string;

  @BeforeInsert()
  generateId() {
    
    console.log('User is being inserted...');
  }
}
