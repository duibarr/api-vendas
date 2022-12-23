import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { ICreateUserRequest } from '../domain/models/ICreateUserRequest';
import { ICreateUserResponse } from '../domain/models/ICreateUserResponse';
import { inject, injectable } from 'tsyringe';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class CreateSessionsService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashContainer')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        email,
        password,
    }: ICreateUserRequest): Promise<ICreateUserResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordConfirmed = await this.hashProvider.compareHash(
            password,
            user.password,
        );

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const token = sign({}, authConfig.jwt.secret as string, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default CreateSessionsService;
