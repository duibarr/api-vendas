import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { getRepository, In, Repository } from 'typeorm';
import { IFindProducts } from '../../../domain/models/IFindProducts';
import Product from '../entities/Product';

class ProductRepository implements IProductsRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = getRepository(Product);
    }

    public async save(product: Product): Promise<Product> {
        await this.ormRepository.save(product);

        return product;
    }

    public async create({
        name,
        price,
        quantity,
    }: ICreateProduct): Promise<Product> {
        const product = this.ormRepository.create({ name, price, quantity });

        await this.ormRepository.save(product);

        return product;
    }

    public async findByName(name: string): Promise<Product | undefined> {
        const product = this.ormRepository.findOne({
            where: {
                name,
            },
        });

        return product;
    }

    public async findOne(id: string): Promise<Product | undefined> {
        const product = this.ormRepository.findOne(id);

        return product;
    }

    public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const productIds = products.map(product => product.id);

        const existentProducts = await this.ormRepository.find({
            where: {
                id: In(productIds),
            },
        });

        return existentProducts;
    }

    public async remove(product: Product): Promise<Product> {
        await this.ormRepository.remove(product);

        return product;
    }

    public async find(): Promise<Product[] | null> {
        const products = await this.ormRepository.find();

        return products;
    }
}

export default ProductRepository;
