import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';

@injectable()
class ListUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(): Promise<IUser[]> {
        const users = this.usersRepository.find();

        return users;
    }
}

export default ListUserService;
