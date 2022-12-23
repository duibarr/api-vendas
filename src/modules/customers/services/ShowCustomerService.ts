import AppError from '@shared/errors/AppError';
import { ERROR_MESSAGES } from '@shared/errors/errorMessages';
import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class ShowCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customerRepository: ICustomersRepository,
    ) {}

    public async execute(id: string): Promise<ICustomer> {
        const { CUSTOMER } = ERROR_MESSAGES;

        const customer = await this.customerRepository.findById(id);

        if (!customer) {
            throw new AppError(CUSTOMER.NOT_FOUND);
        }

        return customer;
    }
}

export default ShowCustomerService;
