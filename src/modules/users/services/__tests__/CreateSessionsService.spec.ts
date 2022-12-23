import 'reflect-metadata';
import CreateSessionsService from '../CreateSessionsService';
import AppError from '@shared/errors/AppError';
import { FakeUsersRepository } from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSessionsService: CreateSessionsService;

describe('CreateSessions', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createSessionsService = new CreateSessionsService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('should be able to authenticate', async () => {
        const user = await fakeUserRepository.create({
            name: 'Eduardo',
            email: 'eduardo@example.com',
            password: 'admin',
        });

        const response = await createSessionsService.execute({
            email: 'eduardo@example.com',
            password: 'admin',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate if the email not exists', async () => {
        await fakeUserRepository.create({
            name: 'Eduardo',
            email: 'eduardo@example.com',
            password: 'admin',
        });

        expect(
            createSessionsService.execute({
                email: 'lucas@example.com',
                password: 'admin',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate if the password is wrong', async () => {
        await fakeUserRepository.create({
            name: 'Eduardo',
            email: 'eduardo@example.com',
            password: 'admin',
        });

        expect(
            createSessionsService.execute({
                email: 'eduardo@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
