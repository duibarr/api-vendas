import AppError from '@shared/errors/AppError';
import { ICreateOrderService } from '../domain/models/ICreateOrderService';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';
import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ERROR_MESSAGES } from '@shared/errors/errorMessages';

@injectable()
class CreateOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({
        customer_id,
        products,
    }: ICreateOrderService): Promise<Order> {
        const { ORDERS } = ERROR_MESSAGES;

        const customerExists = await this.customersRepository.findById(
            customer_id,
        );

        if (!customerExists) {
            throw new AppError(ORDERS.CUSTOMER_NOT_FOUND);
        }

        const existsProducts = await this.productsRepository.findAllByIds(
            products,
        );

        if (!existsProducts.length) {
            throw new AppError(ORDERS.PRODUCT_NOT_FOUND);
        }

        const existsProductsIds = existsProducts.map(product => product.id);

        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id),
        );

        if (checkInexistentProducts.length) {
            throw new AppError(
                ORDERS.INEXISTENT_PRODUCT(checkInexistentProducts[0].id),
            );
        }

        const quantityAvailable = products.filter(
            product =>
                existsProducts.filter(p => p.id === product.id)[0].quantity <
                product.quantity,
        );

        if (quantityAvailable.length) {
            const { id, quantity } = quantityAvailable[0];

            throw new AppError(
                ORDERS.UNAVAILABLE_QUANTITY_PRODUCT({
                    id,
                    quantity,
                }),
            );
        }

        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter(p => p.id === product.id)[0].price,
        }));

        const order = await this.ordersRepository.createOrder({
            customer: customerExists,
            products: serializedProducts,
        });

        const { order_products } = order;

        const updatedProductQuantity = order_products.map(product => ({
            id: product.product_id,
            quantity:
                existsProducts.filter(p => p.id === product.product_id)[0]
                    .quantity - product.quantity,
        }));

        for await (const updatedProduct of updatedProductQuantity) {
            await this.productsRepository.save(updatedProduct);
        }

        return order;
    }
}

export default CreateOrderService;
