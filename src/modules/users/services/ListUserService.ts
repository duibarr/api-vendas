import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserPaginate } from '../domain/models/IUserPaginate';

interface SearchParams {
    page: number;
    limit: number;
}

@injectable()
class ListUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        limit,
        page,
    }: SearchParams): Promise<IUserPaginate> {
        const take = limit;
        const skip = (Number(page) - 1) * take;

        const users = await this.usersRepository.findAll({
            page,
            skip,
            take,
        });

        return users;
    }
}

export default ListUserService;
