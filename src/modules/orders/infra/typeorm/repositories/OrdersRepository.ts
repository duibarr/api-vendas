import Order from '../entities/Order';
import { ICreateOrderRepository } from '@modules/orders/domain/models/ICreateOrderRepository';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';

class OrdersRepository implements IOrdersRepository {
    private ormRepository: Repository<Order>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Order);
    }

    public async save(order: Order): Promise<Order> {
        await this.ormRepository.save(order);

        return order;
    }

    public async findById(id: string): Promise<Order | null> {
        const order = await this.ormRepository.findOne({
            where: id,
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
