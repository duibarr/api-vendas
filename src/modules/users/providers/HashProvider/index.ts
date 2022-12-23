import { container } from 'tsyringe';
import { BcryptHashProvider } from './implementations/bcryptHashProvider';
import { IHashProvider } from './models/IHashProvider';

container.registerSingleton<IHashProvider>('HashContainer', BcryptHashProvider);
