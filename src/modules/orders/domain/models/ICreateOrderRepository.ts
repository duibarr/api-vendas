import { ICustomer } from '@modules/customers/domain/models/ICustomer';

interface IProductsSerialized {
    product_id: string;
    quantity: number;
    price: number;
}

export interface ICreateOrderRepository {
    customer: ICustomer;
    products: IProductsSerialized[];
}
