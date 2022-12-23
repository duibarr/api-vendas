import 'reflect-metadata';
import CreateUserService from '../../../users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import { FakeHashProvider } from '../../../users/providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';

let fakeUserRepository: FakeUsersRepository;
let createUserService: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUserService = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUserService.execute({
            name: 'eduardo',
            email: 'eduardo@example.com',
            password: 'admin',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user if the email already exists', async () => {
        await createUserService.execute({
            name: 'eduardo',
            email: 'eduardo@example.com',
            password: 'admin',
        });

        expect(
            createUserService.execute({
                name: 'marcos',
                email: 'eduardo@example.com',
                password: 'admin',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
