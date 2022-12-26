import 'reflect-metadata';
import UpdateCustomerService from '../UpdateCustomerService';
import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../../domain/repositories/fakes/FakeCustomersRepository';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

let fakeCustomerRepository: FakeCustomersRepository;
let updateCustomerService: UpdateCustomerService;

describe('CreateCustomer', () => {
    beforeEach(() => {
        fakeCustomerRepository = new FakeCustomersRepository();
        updateCustomerService = new UpdateCustomerService(
            fakeCustomerRepository,
        );
    });

    it('should be able to update a customer', async () => {
        const customer = await fakeCustomerRepository.create({
            name: 'eduardo',
            email: 'eduardo@example.com',
        });

        await updateCustomerService.execute({
            id: customer.id,
            email: 'beatriz@example.com',
            name: 'beatriz',
        });

        const customerUpdated = await fakeCustomerRepository.findById(
            customer.id,
        );

        expect(customerUpdated?.id).toBe(customer.id);
        expect(customerUpdated?.name).toBe('beatriz');
        expect(customerUpdated?.email).toBe('beatriz@example.com');
    });

    it('should not be able to update a customer if the email inserted already exists', async () => {
        await fakeCustomerRepository.create({
            name: 'eduardo',
            email: 'eduardo@example.com',
        });

        const customerToUpdate = await fakeCustomerRepository.create({
            name: 'ana',
            email: 'ana@example.com',
        });

        expect(
            updateCustomerService.execute({
                id: customerToUpdate.id,
                name: 'ana',
                email: 'eduardo@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update a customer if not exists', async () => {
        await fakeCustomerRepository.create({
            name: 'eduardo',
            email: 'eduardo@example.com',
        });

        expect(
            updateCustomerService.execute({
                id: 'someCustomerIdThatDoesNotExist',
                email: 'eduardo@example.com',
                name: 'eduardo',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
