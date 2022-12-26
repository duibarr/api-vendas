import 'reflect-metadata';
import ListProductService from '../ListProductService';
import FakeProductsRepository from '../../domain/repositories/fakes/FakeProductsRepository';

let fakeProductsRepository: FakeProductsRepository;
let listProductService: ListProductService;

describe('ListProduct', () => {
    beforeEach(() => {
        fakeProductsRepository = new FakeProductsRepository();
        listProductService = new ListProductService(fakeProductsRepository);
    });

    it('should be able to list the products', async () => {
        await fakeProductsRepository.create({
            name: 'Caneta',
            price: 2,
            quantity: 40,
        });

        await fakeProductsRepository.create({
            name: 'Papel A4 100un',
            price: 10,
            quantity: 30,
        });

        await fakeProductsRepository.create({
            name: 'Caderno',
            price: 19,
            quantity: 20,
        });

        const page = 1;
        const limitPerPage = 15;

        const products = await listProductService.execute({
            limit: limitPerPage,
            page,
        });

        expect(products.data.length).toBe(3);
        expect(products.total).toBe(3);
        expect(products.current_page).toBe(1);
        expect(products.per_page).toBe(15);
    });
});
