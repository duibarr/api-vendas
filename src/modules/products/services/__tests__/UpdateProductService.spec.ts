import 'reflect-metadata';
import UpdateProductService from '../UpdateProductService';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../../domain/repositories/fakes/FakeProductsRepository';

let fakeProductsRepository: FakeProductsRepository;
let updateProductService: UpdateProductService;

describe('UpdateProduct', () => {
    beforeEach(() => {
        fakeProductsRepository = new FakeProductsRepository();
        updateProductService = new UpdateProductService(fakeProductsRepository);
    });

    it('should be able to update a product', async () => {
        const product = await fakeProductsRepository.create({
            name: 'Caneta',
            price: 2,
            quantity: 40,
        });

        await updateProductService.execute({
            id: product.id,
            name: 'Caneta Vermelha',
            price: 3,
            quantity: 22,
        });

        const productUpdated = await fakeProductsRepository.findOne(product.id);

        expect(productUpdated?.id).toBe(product.id);
        expect(productUpdated?.name).toBe('Caneta Vermelha');
        expect(productUpdated?.price).toBe(3);
        expect(productUpdated?.quantity).toBe(22);
    });

    it('should not be able to update a product if the name inserted already exists', async () => {
        await fakeProductsRepository.create({
            name: 'Caneta',
            price: 2,
            quantity: 40,
        });

        const productToUpdate = await fakeProductsRepository.create({
            name: 'Papel A4 100un',
            price: 19,
            quantity: 60,
        });

        expect(
            updateProductService.execute({
                id: productToUpdate.id,
                name: 'Caneta',
                price: 7,
                quantity: 20,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to show a update a product if not exists', async () => {
        await fakeProductsRepository.create({
            name: 'Caneta',
            price: 2,
            quantity: 40,
        });

        expect(
            updateProductService.execute({
                id: 'someProductIdThatDoesNotExist',
                name: 'Caneta',
                price: 7,
                quantity: 20,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
