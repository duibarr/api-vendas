import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrdersProducts from './OrdersProducts';
import { IOrder } from '@modules/orders/domain/models/IOrder';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IOrdersProducts } from '@modules/orders/domain/models/IOrdersProducts';

@Entity('orders')
class Order implements IOrder {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: ICustomer;

    @OneToMany(() => OrdersProducts, order_products => order_products.order, {
        cascade: true,
    })
    order_products: IOrdersProducts[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order;
