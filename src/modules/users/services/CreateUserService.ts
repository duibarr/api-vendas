import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { ERROR_MESSAGES } from '@shared/errors/errorMessages';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashContainer')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        name,
        email,
        password,
    }: ICreateUser): Promise<IUser> {
        const { USERS } = ERROR_MESSAGES;

        const emailExists = await this.usersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError(USERS.EMAIL_ALREADY_IN_USE);
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await this.usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
