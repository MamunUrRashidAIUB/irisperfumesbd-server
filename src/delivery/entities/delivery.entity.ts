import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OneToOne, OneToMany } from 'typeorm';
import { DeliveryLogin } from './delivery-login.entity';
import { Order } from './order.entity';

@Entity('delivery')
export class Delivery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150})
    uniqueId: string;

    @CreateDateColumn({ type: 'timestamp'})
    joiningDate: Date;

    @Column({ length: 30, default: 'Unknown' })
    country: string;

    @Column({ length: 100, nullable: true })
    name: string;

    @Column({ length: 300, nullable: true })
    socialMediaLink: string;

    @BeforeInsert()
    generateUUID() {
        this.uniqueId = uuidv4();
    }

    @OneToOne(() => DeliveryLogin, (login) => login.delivery, { cascade: true })
    login: DeliveryLogin;

    @OneToMany(() => Order, (order) => order.delivery, { cascade: true })
    orders: Order[];

}