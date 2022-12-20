interface IProducts {
    id: string;
    quantity: number;
}

export interface ICreateOrderService {
    customer_id: string;
    products: IProducts[];
}
