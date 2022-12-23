import AppError from '@shared/errors/AppError';
import { ERROR_MESSAGES } from '@shared/errors/errorMessages';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class DeleteCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customerRepository: ICustomersRepository,
    ) {}

    public async execute(id: string): Promise<void> {
        const { CUSTOMER } = ERROR_MESSAGES;

        const customer = await this.customerRepository.findById(id);

        if (!customer) {
            throw new AppError(CUSTOMER.NOT_FOUND);
        }

        await this.customerRepository.remove(customer);
    }
}

export default DeleteCustomerService;
