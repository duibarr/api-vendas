import AppError from '@shared/errors/AppError';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';
import { ERROR_MESSAGES } from '@shared/errors/errorMessages';

@injectable()
class CreateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({
        name,
        price,
        quantity,
    }: ICreateProduct): Promise<IProduct> {
        const { PRODUCTS } = ERROR_MESSAGES;

        const productExists = await this.productsRepository.findByName(name);

        if (productExists) {
            throw new AppError(PRODUCTS.NAME_ALREADY_IN_USE);
        }

        const product = await this.productsRepository.create({
            name,
            price,
            quantity,
        });

        await this.productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;
