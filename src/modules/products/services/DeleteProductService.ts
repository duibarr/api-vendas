import AppError from '@shared/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';
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

        await this.productsRepository.remove(product);
    }
}

export default DeleteProductService;
