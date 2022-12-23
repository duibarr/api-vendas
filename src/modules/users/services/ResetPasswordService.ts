import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { ERROR_MESSAGES } from '@shared/errors/errorMessages';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersTokensRepository')
        private userTokensRepository: IUserTokensRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashContainer')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const { USERS } = ERROR_MESSAGES;

        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError(USERS.TOKEN_NOT_FOUND);
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError(USERS.USER_NOT_FOUND);
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError(USERS.TOKEN_EXPIRED);
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
