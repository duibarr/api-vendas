import 'reflect-metadata';
import ListCustomerService from '../ListCustomerService';
import FakeCustomersRepository from '../../domain/repositories/fakes/FakeCustomersRepository';

let fakeCustomerRepository: FakeCustomersRepository;
let listCustomerService: ListCustomerService;

describe('ListCustomer', () => {
    beforeEach(() => {
        fakeCustomerRepository = new FakeCustomersRepository();
        listCustomerService = new ListCustomerService(fakeCustomerRepository);
    });

    it('should be able to list the customers', async () => {
        await fakeCustomerRepository.create({
            name: 'eduardo',
            email: 'eduardo@example.com',
        });

        await fakeCustomerRepository.create({
            name: 'ana',
            email: 'ana@example.com',
        });

        await fakeCustomerRepository.create({
            name: 'carlos',
            email: 'carlos@example.com',
        });

        const page = 1;
        const limitPerPage = 15;

        const customers = await listCustomerService.execute({
            limit: limitPerPage,
            page,
        });

        expect(customers.data.length).toBe(3);
        expect(customers.total).toBe(3);
        expect(customers.current_page).toBe(1);
        expect(customers.per_page).toBe(15);
    });
});
