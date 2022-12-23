import User from '@modules/users/infra/typeorm/entities/User';
import { v4 as uuidv4 } from 'uuid';
import { ICreateUser } from '../../models/ICreateUser';
import { IUser } from '../../models/IUser';
import { IUserPaginate } from '../../models/IUserPaginate';
import { IUsersRepository } from '../IUsersRepository';

export class FakeUsersRepository implements IUsersRepository {
    private users: IUser[] = [];

    public async create({
        name,
        email,
        password,
    }: ICreateUser): Promise<IUser> {
        const user = new User();

        user.id = uuidv4();
        user.name = name;
        user.email = email;
        user.password = password;

        this.users.push(user);

        return user;
    }

    public async save(user: IUser): Promise<IUser> {
        const findIndex = this.users.findIndex(findUser => {
            findUser.id === user.id;
        });

        this.users[findIndex] = user;

        return user;
    }

    public async remove(user: IUser): Promise<void> {
        // do anything
        () => user;
    }

    public async findAll(): Promise<IUserPaginate> {
        return {} as IUserPaginate;
    }

    public async findByName(name: string): Promise<IUser | null> {
        const user = this.users.find(user => user.name === name);

        return user || null;
    }

    public async findById(id: string): Promise<IUser | null> {
        const user = this.users.find(user => user.id === id);

        return user || null;
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        const user = this.users.find(user => user.email === email);

        return user || null;
    }
}
