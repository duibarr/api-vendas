import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { IProduct } from '../domain/models/IProduct';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { ERROR_MESSAGES } from '@shared/errors/errorMessages';

@injectable()
class UpdateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({
        id,
        name,
        price,
        quantity,
    }: IUpdateProduct): Promise<IProduct> {
        const { PRODUCTS } = ERROR_MESSAGES;

        const product = await this.productsRepository.findOne(id);

        if (!product) {
            throw new AppError(PRODUCTS.NOT_FOUND);
        }

        const productExists = await this.productsRepository.findByName(name);

        if (productExists) {
            throw new AppError(PRODUCTS.NAME_ALREADY_IN_USE);
        }

        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await this.productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
