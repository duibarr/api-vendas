import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';
import { ERROR_MESSAGES } from '@shared/errors/errorMessages';

interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<IUser> {
        const { USERS } = ERROR_MESSAGES;

        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(USERS.USER_NOT_FOUND);
        }

        return user;
    }
}

export default ShowProfileService;
