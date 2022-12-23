import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';
import { IProductPaginate } from '../models/IProductPaginate';
import { ISaveProduct } from '../models/ISaveProduct';

export type SearchParams = {
    page: number;
    skip: number;
    take: number;
};

export interface IProductsRepository {
    findAll(params: SearchParams): Promise<IProductPaginate>;
    findByName(name: string): Promise<IProduct | null>;
    findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
    save(product: ISaveProduct): Promise<IProduct>;
    create(product: ICreateProduct): Promise<IProduct>;
    remove(product: IProduct): Promise<IProduct>;
    findOne(id: string): Promise<IProduct | null>;
}
