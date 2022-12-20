import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';
import { ISaveProduct } from '../models/ISaveProduct';

export interface IProductsRepository {
    findByName(name: string): Promise<IProduct | undefined>;
    findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
    save(product: ISaveProduct): Promise<IProduct>;
    create(product: ICreateProduct): Promise<IProduct>;
    remove(product: IProduct): Promise<IProduct>;
    findOne(id: string): Promise<IProduct | undefined>;
    find(): Promise<IProduct[] | null>;
}
