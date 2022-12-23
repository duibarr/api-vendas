import { compare, hash } from 'bcryptjs';
import { IHashProvider } from '../models/IHashProvider';

export class BcryptHashProvider implements IHashProvider {
    public async compareHash(
        payload: string,
        hashed: string,
    ): Promise<boolean> {
        return compare(payload, hashed);
    }

    public async generateHash(payload: string): Promise<string> {
        return hash(payload, 8);
    }
}
