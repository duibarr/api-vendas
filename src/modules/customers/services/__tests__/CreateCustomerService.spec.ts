import 'reflect-metadata';
import CreateCustomerService from '../../../customers/services/CreateCustomerService';
import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../../../customers/domain/repositories/fakes/FakeCustomersRepository';

let fakeCustomerRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;

describe('CreateCustomer', () => {
    beforeEach(() => {
        fakeCustomerRepository = new FakeCustomersRepository();
        createCustomerService = new CreateCustomerService(
            fakeCustomerRepository,
        );
    });

    it('should be able to create a new customer', async () => {
        const customer = await createCustomerService.execute({
            name: 'eduardo',
            email: 'eduardo@example.com',
        });

        expect(customer).toHaveProperty('id');
    });

    it('should not be able to create a new customer if the email already exists', async () => {
        await createCustomerService.execute({
            name: 'eduardo',
            email: 'eduardo@example.com',
        });

        expect(
            createCustomerService.execute({
                name: 'marcos',
                email: 'eduardo@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
