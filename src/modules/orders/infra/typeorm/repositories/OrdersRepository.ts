import Order from '../entities/Order';
import { ICreateOrderRepository } from '@modules/orders/domain/models/ICreateOrderRepository';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { getRepository, Repository } from 'typeorm';

class OrdersRepository implements IOrdersRepository {
    private ormRepository: Repository<Order>;

    constructor() {
        this.ormRepository = getRepository(Order);
    }

    public async save(order: Order): Promise<Order> {
        await this.ormRepository.save(order);

        return order;
    }

    public async findById(id: string): Promise<Order | undefined> {
        const order = this.ormRepository.findOne(id, {
            relations: ['order_products', 'customer'],
        });

        return order;
    }

    public async createOrder({
        customer,
        products,
    }: ICreateOrderRepository): Promise<Order> {
        const order = this.ormRepository.create({
            customer,
            order_products: products,
        });

        await this.ormRepository.save(order);

        return order;
    }
}

export default OrdersRepository;
