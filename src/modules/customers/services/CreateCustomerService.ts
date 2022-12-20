import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class CreateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customerRepository: ICustomersRepository,
    ) {
        this.customerRepository = customerRepository;
    }

    public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
        const emailExists = await this.customerRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used.');
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
