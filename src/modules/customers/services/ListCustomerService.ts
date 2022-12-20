import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class ListCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customerRepository: ICustomersRepository,
    ) {}

    public async execute(): Promise<ICustomer[] | undefined> {
        const customers = await this.customerRepository.find();

        return customers;
    }
}

export default ListCustomerService;
