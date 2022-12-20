import redisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';
import AppError from '@shared/errors/AppError';

@injectable()
class ListProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(): Promise<IProduct[]> {
        let products = await redisCache.recover<IProduct[]>(
            'api-vendas-PRODUCT_LIST',
        );

        if (!products) {
            products = await this.productsRepository.find();

            await redisCache.save('api-vendas-PRODUCT_LIST', products);
        }

        if (!products) {
            throw new AppError('There are no products.', 404);
        }

        return products;
    }
}

export default ListProductService;
