import AppError from '@shared/errors/AppError';
import { ERROR_MESSAGES } from '@shared/errors/errorMessages';
import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { IOrder } from '../domain/models/IOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';

@injectable()
class ShowOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) {}

    public async execute(id: string): Promise<IOrder> {
        const { ORDERS } = ERROR_MESSAGES;

        const order = await this.ordersRepository.findById(id);

        if (!order) {
            throw new AppError(ORDERS.ORDER_NOT_FOUND);
        }

        return order;
    }
}

export default ShowOrderService;
