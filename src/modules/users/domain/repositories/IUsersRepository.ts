import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';
import { IUserPaginate } from '../models/IUserPaginate';

export type SearchParams = {
    page: number;
    skip: number;
    take: number;
};

export interface IUsersRepository {
    findByName(name: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    save(user: IUser): Promise<IUser>;
    create(user: ICreateUser): Promise<IUser>;
    findAll(params: SearchParams): Promise<IUserPaginate>;
}
