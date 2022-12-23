import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { ERROR_MESSAGES } from '../../../shared/errors/errorMessages';

@injectable()
class CreateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customerRepository: ICustomersRepository,
    ) {
        this.customerRepository = customerRepository;
    }

    public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
        const { CUSTOMER } = ERROR_MESSAGES;

        const emailExists = await this.customerRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError(CUSTOMER.EMAIL_ALREADY_IN_USE);
        }

        const customer = await this.customerRepository.create({
            name,
            email,
        });

        await this.customerRepository.save(customer);

        return customer;
    }
}

export default CreateCustomerService;
