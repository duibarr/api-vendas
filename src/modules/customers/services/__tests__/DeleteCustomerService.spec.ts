import 'reflect-metadata';
import DeleteCustomerService from '../DeleteCustomerService';
import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../../domain/repositories/fakes/FakeCustomersRepository';

let fakeCustomerRepository: FakeCustomersRepository;
let deleteCustomerService: DeleteCustomerService;

describe('DeleteCustomer', () => {
    beforeEach(() => {
        fakeCustomerRepository = new FakeCustomersRepository();
        deleteCustomerService = new DeleteCustomerService(
            fakeCustomerRepository,
        );
    });

    it('should be able to delete a customer', async () => {
        const customer = await fakeCustomerRepository.create({
            name: 'eduardo',
            email: 'eduardo@example.com',
        });

        const page = 1;
        const skip = 0;
        const take = 15;

        const customersBeforeDeletion = await fakeCustomerRepository.findAll({
            page,
            skip,
            take,
        });

        expect(customersBeforeDeletion.data.length).toBe(1);

        await deleteCustomerService.execute(customer.id);

        const customersAfterDeletion = await fakeCustomerRepository.findAll({
            page,
            skip,
            take,
        });

        expect(customersAfterDeletion.data.length).toBe(0);
    });

    it('should not be able to delete a customer if not exists', async () => {
        await fakeCustomerRepository.create({
            name: 'eduardo',
            email: 'eduardo@example.com',
        });

        expect(
            deleteCustomerService.execute('someCustomerIdThatDoesNotExist'),
        ).rejects.toBeInstanceOf(AppError);
    });
});
