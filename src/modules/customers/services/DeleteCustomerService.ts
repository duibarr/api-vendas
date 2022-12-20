import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class DeleteCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customerRepository: ICustomersRepository,
    ) {}

    public async execute(id: string): Promise<void> {
        const customer = await this.customerRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        await this.customerRepository.remove(customer);
    }
}

export default DeleteCustomerService;
