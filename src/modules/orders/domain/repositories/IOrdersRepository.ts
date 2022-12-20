import { ICreateOrderRepository } from '../models/ICreateOrderRepository';
import { IOrder } from '../models/IOrder';

export interface IOrdersRepository {
    findById(id: string): Promise<IOrder | undefined>;
    createOrder({
        customer,
        products,
    }: ICreateOrderRepository): Promise<IOrder>;
}
