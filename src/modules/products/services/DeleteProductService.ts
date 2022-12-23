import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { ERROR_MESSAGES } from '@shared/errors/errorMessages';

@injectable()
class DeleteProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(id: string): Promise<void> {
        const { PRODUCTS } = ERROR_MESSAGES;

        const product = await this.productsRepository.findOne(id);

        if (!product) {
            throw new AppError(PRODUCTS.NOT_FOUND);
        }

        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

        await this.productsRepository.remove(product);
    }
}

export default DeleteProductService;
