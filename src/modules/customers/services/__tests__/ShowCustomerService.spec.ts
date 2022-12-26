import 'reflect-metadata';
import ShowCustomerService from '../ShowCustomerService';
import FakeCustomersRepository from '../../domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomerRepository: FakeCustomersRepository;
let showCustomerService: ShowCustomerService;

describe('ShowCustomer', () => {
    beforeEach(() => {
        fakeCustomerRepository = new FakeCustomersRepository();
        showCustomerService = new ShowCustomerService(fakeCustomerRepository);
    });

    it('should be able to show a customer', async () => {
        await fakeCustomerRepository.create({
            name: 'eduardo',
            email: 'eduardo@example.com',
        });

        const customerToShow = await fakeCustomerRepository.create({
            name: 'ana',
            email: 'ana@example.com',
        });

        const customer = await showCustomerService.execute(customerToShow.id);

        expect(customer.name).toBe('ana');
        expect(customer.email).toBe('ana@example.com');
    });

    it('should not be able to show a customer if not exists', async () => {
        await fakeCustomerRepository.create({
            name: 'eduardo',
            email: 'eduardo@example.com',
        });

        expect(
            showCustomerService.execute('someCustomerIdThatDoesNotExist'),
        ).rejects.toBeInstanceOf(AppError);
    });
});
