import 'reflect-metadata';
import ShowProductService from '../ShowProductService';
import FakeProductsRepository from '../../domain/repositories/fakes/FakeProductsRepository';
import AppError from '@shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let showProductService: ShowProductService;

describe('ShowProduct', () => {
    beforeEach(() => {
        fakeProductsRepository = new FakeProductsRepository();
        showProductService = new ShowProductService(fakeProductsRepository);
    });

    it('should be able to show a product', async () => {
        await fakeProductsRepository.create({
            name: 'Caneta',
            price: 2,
            quantity: 40,
        });

        const productToShow = await fakeProductsRepository.create({
            name: 'Papel A4 100un',
            price: 11,
            quantity: 110,
        });

        const product = await showProductService.execute(productToShow.id);

        expect(product.name).toBe('Papel A4 100un');
        expect(product.price).toBe(11);
        expect(product.quantity).toBe(110);
    });

    it('should not be able to show a product if not exists', async () => {
        await fakeProductsRepository.create({
            name: 'Caneta',
            price: 2,
            quantity: 40,
        });

        expect(
            showProductService.execute('someProductIdThatDoesNotExist'),
        ).rejects.toBeInstanceOf(AppError);
    });
});
