import { SearchParams } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { dataSource } from '@shared/infra/typeorm';
import { In, Repository } from 'typeorm';
import { IFindProducts } from '../../../domain/models/IFindProducts';
import Product from '../entities/Product';

class ProductRepository implements IProductsRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Product);
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

    public async findByName(name: string): Promise<Product | null> {
        const product = await this.ormRepository.findOneBy({ name });

        return product;
    }

    public async findOne(id: string): Promise<Product | null> {
        const product = await this.ormRepository.findOneBy({ id });

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

    public async remove(product: Product): Promise<void> {
        await this.ormRepository.remove(product);
    }

    public async findAll({
        page,
        skip,
        take,
    }: SearchParams): Promise<IProductPaginate> {
        const [products, count] = await this.ormRepository
            .createQueryBuilder()
            .skip(skip)
            .take(take)
            .getManyAndCount();

        const result: IProductPaginate = {
            per_page: take,
            total: count,
            current_page: page,
            data: products,
        };

        return result;
    }
}

export default ProductRepository;
