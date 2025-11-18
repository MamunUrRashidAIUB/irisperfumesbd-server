import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  fullName: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 8, default: 'active' })
  status: 'active' | 'inactive';

  constructor(partial?: Partial<User>) {
    if (partial) Object.assign(this, partial);
  }
}
