import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import {
    ICustomersRepository,
    SearchParams,
} from '@modules/customers/domain/repositories/ICustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { v4 as uuidv4 } from 'uuid';
import { ICustomerPaginate } from '../../models/ICustomerPaginate';

class CustomersRepository implements ICustomersRepository {
    private customers: Customer[] = [];

    public async create({ name, email }: ICreateCustomer): Promise<Customer> {
        const customer = new Customer();

        customer.id = uuidv4();
        customer.name = name;
        customer.email = email;

        this.customers.push(customer);

        return customer;
    }

    public async save(customer: Customer): Promise<Customer> {
        const findIndex = this.customers.findIndex(findCustomer => {
            findCustomer.id === customer.id;
        });

        this.customers[findIndex] = customer;

        return customer;
    }

    public async remove(customer: Customer): Promise<void> {
        const indexOfCustomer = this.customers.findIndex(
            c => c.id === customer.id,
        );

        this.customers.splice(indexOfCustomer, 1);
    }

    public async findAll({
        page,
        skip,
        take,
    }: SearchParams): Promise<ICustomerPaginate> {
        return {
            current_page: page,
            total: this.customers.length,
            per_page: take,
            data: this.customers,
        };
    }

    public async findByName(name: string): Promise<Customer | null> {
        const customer = this.customers.find(
            customer => customer.name === name,
        );

        return customer || null;
    }

    public async findById(id: string): Promise<Customer | null> {
        const customer = this.customers.find(customer => customer.id === id);

        return customer || null;
    }

    public async findByEmail(email: string): Promise<Customer | null> {
        const customer = this.customers.find(
            customer => customer.email === email,
        );

        return customer || null;
    }
}

export default CustomersRepository;
