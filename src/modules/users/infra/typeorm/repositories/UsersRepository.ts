import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUserPaginate } from '@modules/users/domain/models/IUserPaginate';
import {
    IUsersRepository,
    SearchParams,
} from '@modules/users/domain/repositories/IUsersRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = dataSource.getRepository(User);
    }

    public async findByName(name: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                name,
            },
        });

        return user;
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
        });

        return user;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                email,
            },
        });

        return user;
    }

    public async save(user: User): Promise<User> {
        await this.ormRepository.save(user);

        return user;
    }

    public async create({ name, email, password }: ICreateUser): Promise<User> {
        const user = this.ormRepository.create({ name, email, password });

        await this.ormRepository.save(user);

        return user;
    }

    public async findAll({
        page,
        skip,
        take,
    }: SearchParams): Promise<IUserPaginate> {
        const [
            users,
            count,
        ] = await this.ormRepository
            .createQueryBuilder()
            .skip(skip)
            .take(take)
            .getManyAndCount();

        const result: IUserPaginate = {
            per_page: take,
            total: count,
            current_page: page,
            data: users,
        };

        return result;
    }
}

export default UsersRepository;
