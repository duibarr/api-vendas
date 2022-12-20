import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import { ICreateUserRequest } from '../domain/models/ICreateUserRequest';
import { ICreateUserResponse } from '../domain/models/ICreateUserResponse';
import { inject, injectable } from 'tsyringe/dist/typings/decorators';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';

@injectable()
class CreateSessionsService {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUserTokensRepository,
    ) {}

    public async execute({
        email,
        password,
    }: ICreateUserRequest): Promise<ICreateUserResponse> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordConfirmed = await compare(password, user.password);

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
