import User from '@modules/users/infra/typeorm/entities/User';
import { v4 as uuidv4 } from 'uuid';
import { ICreateUser } from '../../models/ICreateUser';
import { IUser } from '../../models/IUser';
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

    public async save(User: IUser): Promise<IUser> {
        const findIndex = this.users.findIndex(findUser => {
            findUser.id === User.id;
        });

        this.users[findIndex] = User;

        return User;
    }

    public async remove(User: IUser): Promise<void> {
        // do anything
        () => User;
    }

    public async find(): Promise<IUser[] | undefined> {
        return undefined;
    }

    public async findByName(name: string): Promise<IUser | undefined> {
        const user = this.users.find(User => User.name === name);

        return user;
    }

    public async findById(id: string): Promise<IUser | undefined> {
        const user = this.users.find(User => User.id === id);

        return user;
    }

    public async findByEmail(email: string): Promise<IUser | undefined> {
        const user = this.users.find(User => User.email === email);

        return user;
    }
}
