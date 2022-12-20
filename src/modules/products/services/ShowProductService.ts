import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';

@injectable()
class ShowProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(id: string): Promise<IProduct> {
        const product = await this.productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        return product;
    }
}

export default ShowProductService;
