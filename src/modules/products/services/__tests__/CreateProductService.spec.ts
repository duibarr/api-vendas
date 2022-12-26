import 'reflect-metadata';
import CreateProductService from '../CreateProductService';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../../domain/repositories/fakes/FakeProductsRepository';

let fakeProductsRepository: FakeProductsRepository;
let createProductService: CreateProductService;

describe('CreateProduct', () => {
    beforeEach(() => {
        fakeProductsRepository = new FakeProductsRepository();
        createProductService = new CreateProductService(fakeProductsRepository);
    });

    it('should be able to create a new product', async () => {
        const product = await createProductService.execute({
            name: 'Caneta',
            price: 2,
            quantity: 40,
        });

        expect(product).toHaveProperty('id');
    });

    it('should not be able to create a new product if the product name already exists', async () => {
        await createProductService.execute({
            name: 'Caneta',
            price: 2,
            quantity: 40,
        });

        expect(
            createProductService.execute({
                name: 'Caneta',
                price: 10,
                quantity: 70,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
