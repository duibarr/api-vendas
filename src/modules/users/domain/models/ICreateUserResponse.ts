import { IUser } from './IUser';

export interface ICreateUserResponse {
    user: IUser;
    token: string;
}
