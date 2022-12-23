import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';
import { ERROR_MESSAGES } from '@shared/errors/errorMessages';

@injectable()
class ShowProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(id: string): Promise<IProduct> {
        const { PRODUCTS } = ERROR_MESSAGES;

        const product = await this.productsRepository.findOne(id);

        if (!product) {
            throw new AppError(PRODUCTS.NOT_FOUND);
        }

        return product;
    }
}

export default ShowProductService;
