import 'reflect-metadata';
import DeleteProductService from '../DeleteProductService';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../../domain/repositories/fakes/FakeProductsRepository';

let fakeProductsRepository: FakeProductsRepository;
let deleteProductService: DeleteProductService;

describe('DeleteCustomer', () => {
    beforeEach(() => {
        fakeProductsRepository = new FakeProductsRepository();
        deleteProductService = new DeleteProductService(fakeProductsRepository);
    });

    it('should be able to delete a product', async () => {
        const product = await fakeProductsRepository.create({
            name: 'Caneta',
            price: 2,
            quantity: 40,
        });

        const page = 1;
        const skip = 0;
        const take = 15;

        const productsBeforeDeletion = await fakeProductsRepository.findAll({
            page,
            skip,
            take,
        });

        expect(productsBeforeDeletion.data.length).toBe(1);

        await deleteProductService.execute(product.id);

        const productsAfterDeletion = await fakeProductsRepository.findAll({
            page,
            skip,
            take,
        });

        expect(productsAfterDeletion.data.length).toBe(0);
    });

    it('should not be able to delete a product if id not exists', async () => {
        await fakeProductsRepository.create({
            name: 'Caneta',
            price: 2,
            quantity: 40,
        });

        expect(
            deleteProductService.execute('someProductIdThatDoesNotExist'),
        ).rejects.toBeInstanceOf(AppError);
    });
});
