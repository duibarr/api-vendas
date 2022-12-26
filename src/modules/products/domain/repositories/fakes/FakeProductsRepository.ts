import Product from '@modules/products/infra/typeorm/entities/Product';
import { v4 as uuidv4 } from 'uuid';
import { ICreateProduct } from '../../models/ICreateProduct';
import { IFindProducts } from '../../models/IFindProducts';
import { IProduct } from '../../models/IProduct';
import { IProductPaginate } from '../../models/IProductPaginate';
import { IProductsRepository, SearchParams } from '../IProductsRepository';

class FakeProductsRepository implements IProductsRepository {
    private products: IProduct[] = [];

    public async save(product: IProduct): Promise<IProduct> {
        return product;
    }

    public async create({
        name,
        price,
        quantity,
    }: ICreateProduct): Promise<IProduct> {
        const product = new Product();

        product.id = uuidv4();
        product.name = name;
        product.price = price;
        product.quantity = quantity;

        this.products.push(product);

        return product;
    }

    public async findByName(name: string): Promise<IProduct | null> {
        const product = this.products.find(product => product.name === name);

        return product || null;
    }

    public async findOne(id: string): Promise<IProduct | null> {
        const product = this.products.find(product => product.id === id);

        return product || null;
    }

    public async findAllByIds(products: IFindProducts[]): Promise<IProduct[]> {
        const productIds = products.map(product => product.id);

        const productsFound: IProduct[] = [];

        productIds.forEach(productId => {
            const productFound = this.products.find(
                product => product.id === productId,
            );

            if (productFound) {
                productsFound.push(productFound);
            }
        });

        return productsFound || null;
    }

    public async remove(product: IProduct): Promise<void> {
        const indexOfProduct = this.products.findIndex(
            p => p.id === product.id,
        );

        this.products.splice(indexOfProduct, 1);
    }

    public async findAll({
        page,
        skip,
        take,
    }: SearchParams): Promise<IProductPaginate> {
        return {
            current_page: page,
            total: this.products.length,
            per_page: take,
            data: this.products,
        };
    }
}

export default FakeProductsRepository;
