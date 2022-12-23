import redisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProductPaginate } from '../domain/models/IProductPaginate';

interface SearchParams {
    page: number;
    limit: number;
}

@injectable()
class ListProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({
        limit,
        page,
    }: SearchParams): Promise<IProductPaginate> {
        let products = await redisCache.recover<IProductPaginate>(
            'api-vendas-PRODUCT_LIST',
        );

        if (!products) {
            const take = limit;
            const skip = (Number(page) - 1) * take;

            products = await this.productsRepository.findAll({
                page,
                skip,
                take,
            });

            await redisCache.save('api-vendas-PRODUCT_LIST', products);
        }

        return products;
    }
}

export default ListProductService;
