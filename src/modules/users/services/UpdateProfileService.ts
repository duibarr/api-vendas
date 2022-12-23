import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { ERROR_MESSAGES } from '@shared/errors/errorMessages';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashContainer')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: IRequest): Promise<IUser> {
        const { USERS } = ERROR_MESSAGES;

        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(USERS.USER_NOT_FOUND);
        }

        const userUpdateEmail = await this.usersRepository.findByEmail(email);

        if (userUpdateEmail && userUpdateEmail.id !== user_id) {
            throw new AppError(USERS.EMAIL_ALREADY_IN_USE);
        }

        if (password && !old_password) {
            throw new AppError(USERS.OLD_PASS_REQUIRED);
        }

        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );

            if (!checkOldPassword) {
                throw new AppError(USERS.OLD_PASS_NOT_MATCH);
            }

            user.password = await this.hashProvider.generateHash(password);
        }

        user.name = name;
        user.email = email;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateProfileService;
